const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: [{ type: Schema.ObjectId, ref: 'Item' }],
    status: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;