import bcrypt from 'bcrypt';

export const hashPassword = async (plain) => {
    const saltRounds = 10;
    return bcrypt.hash(plain, saltRounds);
};

export const isSamePassword = async (plain, hash) => {
    if (!hash) return false;
    return bcrypt.compare(plain, hash);
};