import UserDAO from '../dao/user.dao.js';
import UserRepository from '../repositories/user.repository.js';
import { hashPassword, isSamePassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

const userRepo = new UserRepository(new UserDAO());

export default class AuthService {
    async register({ name, email, password, role }) {
    const existing = await userRepo.getByEmail(email);
    if (existing) {
        const err = new Error('El email ya está registrado');
        err.statusCode = 400;
        throw err;
    }

    const passwordHash = await hashPassword(password);
    const created = await userRepo.create({
        name,
        email,
        password: passwordHash,
        role: role || 'user'
    });

    const token = signToken({ sub: created._id.toString(), role: created.role });
    return { user: created, token };
    }

    async login({ email, password }) {
    const user = await userRepo.getByEmail(email);
    if (!user) {
        const err = new Error('Credenciales inválidas');
        err.statusCode = 401;
        throw err;
    }

    const ok = await isSamePassword(password, user.password);
    if (!ok) {
        const err = new Error('Credenciales inválidas');
        err.statusCode = 401;
        throw err;
    }

    const token = signToken({ sub: user._id.toString(), role: user.role });
    return { user, token };
    }
}