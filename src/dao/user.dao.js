import { userModel } from '../models/user.model.js';

export default class UserDAO {
    async getUsers() {
    return await userModel.find().lean();
    }

    async getUserById(id) {
    return await userModel.findById(id);
    }

    async getUserByEmail(email) {
    return await userModel.findOne({ email }).exec();
    }

    async createUser(userData) {
    return await userModel.create(userData);
    }

    async updateUserById(id, update) {
    return await userModel.findByIdAndUpdate(id, update, { new: true }).exec();
    }
}