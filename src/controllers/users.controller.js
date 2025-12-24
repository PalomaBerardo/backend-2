import UserService from '../services/user.service.js';

const userService = new UserService();

export const getUsers = async (req, res) => {
    try {
    const users = await userService.getAll();
    res.send({ status: 'success', result: users });
    } catch (error) {
    res.status(500).send({ status: 'error', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({ status: 'error', message: 'name, email y password son obligatorios' });
    }

    const user = await userService.create({ name, email, password, role });
    res.status(201).send({ status: 'success', result: user });
    } catch (error) {
    res.status(error.statusCode || 500).send({ status: 'error', error: error.message });
    }
};
