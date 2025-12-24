import UserDAO from '../dao/user.dao.js';
import { businessDao } from '../dao/business.dao.js';
import OrderDAO from '../dao/order.dao.js';
import TicketDAO from '../dao/ticket.dao.js';

import UserRepository from '../repositories/user.repository.js';
import BusinessRepository from '../repositories/business.repository.js';
import OrderRepository from '../repositories/order.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';

import { createTicketCode } from '../utils/token.js';

const userRepo = new UserRepository(new UserDAO());
const businessRepo = new BusinessRepository(businessDao);
const orderRepo = new OrderRepository(new OrderDAO());
const ticketRepo = new TicketRepository(new TicketDAO());

export default class OrderService {
    getAll() {
    return orderRepo.getAll();
    }

    async purchase({ userId, businessId, products }) {
    const user = await userRepo.getById(userId);
    const business = await businessRepo.getById(businessId);

    if (!user || !business) {
        const err = new Error('User o Business no válido');
        err.statusCode = 400;
        throw err;
    }

    const normalized = (products || []).map(p => {
        if (typeof p === 'number') return { id: p, quantity: 1 };
        return { id: Number(p.id), quantity: Number(p.quantity || 1) };
    });

    const purchased = [];
    const notPurchased = [];

    for (const item of normalized) {
        const prod = (business.products || []).find(bp => bp.id === item.id);
        if (!prod) {
        notPurchased.push({ ...item, reason: 'not_found' });
        continue;
        }

        const qty = Math.max(1, item.quantity || 1);
        if (prod.stock < qty) {
        notPurchased.push({ id: item.id, quantity: qty, reason: 'no_stock', available: prod.stock });
        continue;
        }

        const dec = await businessRepo.decrementStock(businessId, item.id, qty);
        if (!dec || dec.ok === false) {
        notPurchased.push({ id: item.id, quantity: qty, reason: 'no_stock', available: dec?.available ?? 0 });
        continue;
        }

        prod.stock -= qty;

        purchased.push({
        name: prod.name,
        price: prod.price,
        quantity: qty
        });
    }

    if (purchased.length === 0) {
        const err = new Error('No hay productos válidos en la orden');
        err.statusCode = 400;
        throw err;
    }

    const totalPrice = purchased.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const order = await orderRepo.create({
        number: Date.now(),
        business: businessId,
        user: userId,
        products: purchased,
        totalPrice
    });

    const ticket = await ticketRepo.create({
        code: createTicketCode(),
        amount: totalPrice,
        purchaser: user.email,
        order: order._id
    });

    return { ticket, notPurchased, orderId: order._id };
    }
}