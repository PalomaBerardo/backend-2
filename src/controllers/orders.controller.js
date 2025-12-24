import OrderService from '../services/order.service.js';

const orderService = new OrderService();

export const getOrders = async (req, res) => {
    try {
    const orders = await orderService.getAll();
    res.send({ status: 'success', result: orders });
    } catch (error) {
    res.status(500).send({ status: 'error', error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
    const { userId, businessId, products } = req.body;

    const result = await orderService.purchase({ userId, businessId, products });

    res.status(201).send({ status: 'success', result });
    } catch (error) {
    res.status(error.statusCode || 500).send({ status: 'error', error: error.message });
    }
};
