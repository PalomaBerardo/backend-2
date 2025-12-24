import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from './config.js';
import UserDAO from '../dao/user.dao.js';

const userDao = new UserDAO();

export const initializePassport = () => {
    const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
    };

    passport.use(
    'current',
    new JwtStrategy(opts, async (payload, done) => {
        try {
        const user = await userDao.getUserById(payload.sub);
        if (!user) return done(null, false);
        return done(null, user);
        } catch (err) {
        return done(err, false);
        }
    })
    );
};