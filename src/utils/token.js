import crypto from 'crypto';

export const createResetToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    return { token, tokenHash };
};

export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

export const createTicketCode = () => {
    return crypto.randomBytes(12).toString('hex').toUpperCase();
};