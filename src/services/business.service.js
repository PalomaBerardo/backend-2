import { businessDao } from '../dao/business.dao.js';
import BusinessRepository from '../repositories/business.repository.js';

const businessRepo = new BusinessRepository(businessDao);

export default class BusinessService {
    getAll() {
    return businessRepo.getAll();
    }

    getById(id) {
    return businessRepo.getById(id);
    }

    create(data) {
    return businessRepo.create(data);
    }

    addProduct(businessId, productData) {
    return businessRepo.addProduct(businessId, productData);
    }

    updateProduct(businessId, productId, update) {
    return businessRepo.updateProduct(businessId, productId, update);
    }

    deleteProduct(businessId, productId) {
    return businessRepo.deleteProduct(businessId, productId);
    }
}