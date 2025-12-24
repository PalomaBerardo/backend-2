export default class OrderRepository {
    constructor(orderDao) {
    this.orderDao = orderDao;
    }

    getAll() {
    return this.orderDao.getOrders();
    }

    create(data) {
    return this.orderDao.createOrder(data);
    }

    getById(id) {
    return this.orderDao.getOrderById(id);
    }
}
