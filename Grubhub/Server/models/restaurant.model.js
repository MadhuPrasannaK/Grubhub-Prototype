const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    image: { type: String },
    address: { type: String, required: true },
    zipcode: { type: Number, required: true },
    orders: [{ type: Schema.ObjectId, ref: 'Order' }],
    items: [{ type: Schema.ObjectId, ref: 'Item' }]
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;