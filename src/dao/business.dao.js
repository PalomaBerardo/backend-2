import { businessModel } from '../models/business.model.js';

class BusinessDAO {
    async getBusiness() {
    return await businessModel.find().lean();
    }

    async createBusiness(data) {
    const created = await businessModel.create(data);
    return created.toObject();
    }

    async getBusinessById(id) {
    return await businessModel.findById(id).lean();
    }

    async addProduct(businessId, productData) {
    const business = await businessModel.findById(businessId);
    if (!business) return null;

    business.products.push(productData);

    const updated = await business.save();
    return updated.toObject();
    }

    async updateProduct(businessId, productId, update) {
    const business = await businessModel.findById(businessId);
    if (!business) return null;

    const product = business.products.find(p => p.id === Number(productId));
    if (!product) return null;

    if (update.name !== undefined) product.name = update.name;
    if (update.price !== undefined) product.price = update.price;
    if (update.stock !== undefined) product.stock = update.stock;

    const updatedBusiness = await business.save();
    return updatedBusiness.toObject();
    }

    async deleteProduct(businessId, productId) {
    const business = await businessModel.findById(businessId);
    if (!business) return null;

    const before = business.products.length;
    business.products = business.products.filter(p => p.id !== Number(productId));
    if (business.products.length === before) return null;

    const updatedBusiness = await business.save();
    return updatedBusiness.toObject();
    }

    async decrementStock(businessId, productId, qty) {
    const business = await businessModel.findById(businessId);
    if (!business) return null;

    const product = business.products.find(p => p.id === Number(productId));
    if (!product) return null;

    if (product.stock < qty) return { ok: false, available: product.stock };

    product.stock -= qty;
    await business.save();

    return { ok: true, remaining: product.stock };
    }
}

export const businessDao = new BusinessDAO();