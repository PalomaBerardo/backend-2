import { ticketModel } from '../models/ticket.model.js';

export default class TicketDAO {
    async createTicket(data) {
    return await ticketModel.create(data);
    }

    async getTicketById(id) {
    return await ticketModel.findById(id).lean();
    }
}