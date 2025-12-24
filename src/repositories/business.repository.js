export default class BusinessRepository {
    constructor(businessDao) {
    this.businessDao = businessDao;
    }

    getAll() {
    return this.businessDao.getBusiness();
    }

    getById(id) {
    return this.businessDao.getBusinessById(id);
    }

    create(data) {
    return this.businessDao.createBusiness(data);
    }

    addProduct(businessId, productData) {
    return this.businessDao.addProduct(businessId, productData);
    }

    updateProduct(businessId, productId, update) {
    return this.businessDao.updateProduct(businessId, productId, update);
    }

    deleteProduct(businessId, productId) {
    return this.businessDao.deleteProduct(businessId, productId);
    }

    decrementStock(businessId, productId, qty) {
    return this.businessDao.decrementStock(businessId, productId, qty);
    }
}