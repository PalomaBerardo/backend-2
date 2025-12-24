import { orderModel } from '../models/order.model.js';

export default class OrderDAO {
    async getOrders() {
    return await orderModel.find()
        .populate('user')
        .populate('business');
    }

    async getOrderById(id) {
    return await orderModel.findById(id)
        .populate('user')
        .populate('business')
        .exec();
    }

    async createOrder(orderData) {
    return await orderModel.create(orderData);
    }
}