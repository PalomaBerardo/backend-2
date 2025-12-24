import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const signToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
};