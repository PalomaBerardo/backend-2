import mongoose from 'mongoose';

const orderCollection = 'orders';

const orderSchema = new mongoose.Schema({
    number: Number,
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'businesses' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    products: [
    {
        _id: false,
        name: String,
        price: Number,
        quantity: Number
    }
    ],
    totalPrice: Number
});

export const orderModel = mongoose.model(orderCollection, orderSchema);