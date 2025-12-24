export default class TicketRepository {
    constructor(ticketDao) {
    this.ticketDao = ticketDao;
    }

    create(data) {
    return this.ticketDao.createTicket(data);
    }

    getById(id) {
    return this.ticketDao.getTicketById(id);
    }
}