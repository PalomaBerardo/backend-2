import UserDAO from '../dao/user.dao.js';
import UserRepository from '../repositories/user.repository.js';
import { hashPassword } from '../utils/password.js';

const userRepo = new UserRepository(new UserDAO());

export default class UserService {
    getAll() {
    return userRepo.getAll();
    }

    async create({ name, email, password, role }) {
    const existing = await userRepo.getByEmail(email);
    if (existing) {
        const err = new Error('El email ya está registrado');
        err.statusCode = 400;
        throw err;
    }

    const passwordHash = await hashPassword(password);
    return userRepo.create({ name, email, password: passwordHash, role: role || 'user' });
    }
}