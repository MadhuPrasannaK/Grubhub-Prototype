const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    user_type: { type: String, required: true },
    phone_number: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    restaurant: { type: String, required: true }
    // restaurant: { type: Schema.ObjectId, ref: 'Restaurant' },
    // orders: [{ type: Schema.ObjectId, ref: 'Order' }]
});

const User = mongoose.model('User', userSchema);

module.exports=User;