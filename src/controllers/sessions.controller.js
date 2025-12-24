import AuthService from '../services/auth.service.js';
import PasswordResetService from '../services/passwordReset.service.js';
import CurrentUserDTO from '../dtos/currentUser.dto.js';

const authService = new AuthService();
const passwordResetService = new PasswordResetService();

export const register = async (req, res) => {
    try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ status: 'error', message: 'name, email y password son obligatorios' });
    }

    const { user, token } = await authService.register({ name, email, password, role });

    res.status(201).send({
        status: 'success',
        token,
        user: new CurrentUserDTO(user)
    });
    } catch (err) {
    res.status(err.statusCode || 500).send({ status: 'error', error: err.message });
    }
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'email y password son obligatorios' });
    }

    const { user, token } = await authService.login({ email, password });

    res.send({
        status: 'success',
        token,
        user: new CurrentUserDTO(user)
    });
    } catch (err) {
    res.status(err.statusCode || 500).send({ status: 'error', error: err.message });
    }
};

export const current = async (req, res) => {
    const dto = new CurrentUserDTO(req.user);
    res.send({ status: 'success', user: dto });
};

export const forgotPassword = async (req, res) => {
    try {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ status: 'error', message: 'email es obligatorio' });
    }

    await passwordResetService.requestReset(email);
    res.send({ status: 'success', message: 'Si el email existe, vas a recibir un enlace para restablecer la contraseña' });
    } catch (err) {
    res.status(500).send({ status: 'error', error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
    const { token, email } = req.query;
    const { newPassword } = req.body;

    if (!token || !email || !newPassword) {
        return res.status(400).send({ status: 'error', message: 'token, email y newPassword son obligatorios' });
    }

    await passwordResetService.resetPassword({ email, token, newPassword });
    res.send({ status: 'success', message: 'Contraseña actualizada' });
    } catch (err) {
    res.status(err.statusCode || 500).send({ status: 'error', error: err.message });
    }
};