import UserDAO from '../dao/user.dao.js';
import UserRepository from '../repositories/user.repository.js';
import { createResetToken, hashToken } from '../utils/token.js';
import { hashPassword, isSamePassword } from '../utils/password.js';
import { config } from '../config/config.js';
import { MailService } from './mail.service.js';

const userRepo = new UserRepository(new UserDAO());
const mailer = new MailService();

export default class PasswordResetService {
    async requestReset(email) {
    const user = await userRepo.getByEmail(email);
    if (!user) {
        return { ok: true };
    }

    const { token, tokenHash } = createResetToken();

    await userRepo.updateById(user._id, {
        resetPasswordToken: tokenHash,
      resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000)
    });

    const resetUrl = `${config.app.baseUrl}/api/sessions/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    await mailer.sendPasswordResetMail(email, resetUrl);

    return { ok: true };
    }

    async resetPassword({ email, token, newPassword }) {
    const user = await userRepo.getByEmail(email);
    if (!user) {
        const err = new Error('Token inválido o expirado');
        err.statusCode = 400;
        throw err;
    }

    if (!user.resetPasswordToken || !user.resetPasswordExpires) {
        const err = new Error('Token inválido o expirado');
        err.statusCode = 400;
        throw err;
    }

    if (user.resetPasswordExpires.getTime() < Date.now()) {
        const err = new Error('El enlace expiró');
        err.statusCode = 400;
        throw err;
    }

    const tokenHash = hashToken(token);
    if (tokenHash !== user.resetPasswordToken) {
        const err = new Error('Token inválido o expirado');
        err.statusCode = 400;
        throw err;
    }

    const same = await isSamePassword(newPassword, user.password);
    if (same) {
        const err = new Error('La nueva contraseña no puede ser igual a la anterior');
        err.statusCode = 400;
        throw err;
    }

    const newHash = await hashPassword(newPassword);

    await userRepo.updateById(user._id, {
        password: newHash,
        resetPasswordToken: null,
        resetPasswordExpires: null
    });

    return { ok: true };
    }
}