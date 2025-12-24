import passport from 'passport';

export const requireCurrent = (req, res, next) => {
    return passport.authenticate('current', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
        return res.status(401).send({ status: 'error', message: 'No autorizado' });
    }
    req.user = user;
    next();
    })(req, res, next);
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ status: 'error', message: 'No autorizado' });
    }
    if (!roles.includes(req.user.role)) {
        return res.status(403).send({ status: 'error', message: 'Acceso denegado' });
    }
    next();
    };
};