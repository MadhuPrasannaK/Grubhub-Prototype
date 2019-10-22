const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
let Users = require('../models/user.model');

const jwtSecret = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');

const registerUser = async user_details => {
        let user = await Users.findOne({
            email: user_details.email
        })
        if (!user) throw new Error("Email exists in DB!");
        user.first_name = user_details.first_name
        user.last_name = user_details.last_name
        user.user_type = user_details.user_type
        let updatedUser = await user.save()
        const token = jwt.sign({
            id: updatedUser._id
        }, jwtSecret.secret);
        
        return {
            id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            user_type: updatedUser.user_type,
            token: token
        }  
}

userRouter.get('/', (req, res) => {
    res.send("Grubhub Server Home");
})

userRouter.post('/register', passport.authenticate('register'), (req, res) => {
    const userDetails = req.body;
    return registerUser(userDetails).then(result => {
        console.log("Inside Register User return statement",result);
        res.cookie('grubhubCookie', result.token, {
            maxAge: 900000,
            httpOnly: false
        });
        return res.status(200).json(result);
    }).catch(err => {
        console.log("Register Error: ", err)
        return res.status(500).json(err);
    });
});

module.exports=userRouter;