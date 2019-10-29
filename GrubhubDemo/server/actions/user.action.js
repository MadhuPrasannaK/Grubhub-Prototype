import Users from "../models/user.model"
import jwtSecret from '../config/jwtConfig'
import jwt from 'jsonwebtoken';
import restaurantHandler from "./restaurant.action";
import {
    uploader
} from "../config/cloudinary"

const registerUser = async userDetails => {
    let user = await Users.findOne({
        email: userDetails.email
    })
    if (!user) throw new Error("Email exists in Database");
    user.first_name = userDetails.first_name;
    user.last_name = userDetails.last_name;
    user.user_type = userDetails.user_type;
    let restaurant;
    if (userDetails.user_type === 'Vendor') {
        restaurant = await restaurantHandler.createRestaurant({})
        user.restaurant_id = restaurant.id
    }

    let updatedUser = await user.save()
    const token = jwt.sign({
        id: updatedUser._id
    }, jwtSecret.secret)
    if (updatedUser.user_type === "Vendor")
        return {
            id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            user_type: updatedUser.user_type,
            token: token,
            restaurant_id: updatedUser.restaurant_id
        }
    else {
        return {
            id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            user_type: updatedUser.user_type,
            token: token,
        }
    }
}

const loginUser = async userCredentials => {
    let user = await Users.findOne({
        email: userCredentials.email
    })
    if (!user) return new Error("User not registered!")
    const token = jwt.sign({
        id: user._id
    }, jwtSecret.secret)
    if (user.user_type === 'Vendor') {
        return {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            user_type: user.user_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
            restaurant_id: user.restaurant_id
        }
    } else {
        return {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            user_type: user.user_type,
            phone: user.phone,
            address: user.address,
            image: user.image,
            token: token,
        }
    }
}

const updateUser = async userDetails => {
    let user = await Users.findOne({
        _id: userDetails.user_id
    })
    if (!user) throw new Error("User not found in DB!")
    user.first_name = userDetails.first_name
    user.last_name = userDetails.last_name
    user.phone = userDetails.phone
    user.address = userDetails.address
    user.image = userDetails.image

    let updatedUser = await user.save()
    if (updatedUser.user_type === "Vendor") {
        const restaurantDetails = {
            restaurant_id: userDetails.restaurant_id,
            restaurant_name: userDetails.restaurant_name,
            cuisine: userDetails.cuisine,
            restaurant_image: userDetails.restaurant_image,
            address: userDetails.restaurant_address,
            zipcode: userDetails.restaurant_zipcode,
        }
        let restaurant = await restaurantHandler.updateRestaurant(restaurantDetails)
        return {
            user: {
                id: updatedUser._id,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                phone: updatedUser.phone,
                address: updatedUser.address,
                image: updatedUser.image,
            },
            restaurant

        }
    } else return {
        user: {
            id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            phone: updatedUser.phone,
            address: updatedUser.address,
            image: updatedUser.image,
        }
    }
}

const getUser = async id => {
    let user = await Users.findOne({
        _id: id
    })
    if (!user) throw new Error("User not found in DB!")
    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_type: user.user_type,
        phone: user.phone,
        address: user.address,
        image: user.image
    }
}

const uploadUserImage = async file => {
    let result = await uploader.upload(file, {
        transformation: [{
            width: 175,
            height: 125,
            crop: "scale"
        }]
    })
    const image = result.url;
    return ({
        image
    })
}

export {
    registerUser,
    loginUser,
    updateUser,
    getUser,
    uploadUserImage
};