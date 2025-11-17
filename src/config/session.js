// Construye el middleware de sesión usando connect-mongo como store.
// Buenas prácticas: saveUninitialized:false, resave:false, cookie segura.

import session from 'express-session';
import MongoStore from 'connect-mongo';

export function createSessionMW() {
const { SESSION_SECRET, MONGO_URL, SESSION_TTL_MIN = 30 } = process.env;
if (!SESSION_SECRET) throw new Error('Falta SESSION_SECRET en .env');

  // Store persistente en Mongo (limpieza por TTL interna)
const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    ttl: Number(SESSION_TTL_MIN) * 60, 
    autoRemove: 'interval',
    autoRemoveInterval: 10 
});



return session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    store,
    cookie: {
    httpOnly: true,           
    sameSite: 'lax',          
    maxAge: Number(SESSION_TTL_MIN) * 60 * 1000 
    
    }
});
}