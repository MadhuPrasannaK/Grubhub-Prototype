const express = require("express");
const userRouter = express.Router();
let User = require('../models/user.model');

userRouter.route('/user').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+err))
});

userRouter.route('/user/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user_type = req.body.user_type;
    const phone_number = req.body.phone_number;
    const image = req.body.image;
    const address = req.body.address;
    const restaurant = req.body.restaurant;

    const newUser = new User({
        name,
        email,
        password,
        user_type,
        phone_number,
        image,
        address,
        restaurant
    });

    newUser.create()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: '+err));
    
});

module.exports=userRouter;