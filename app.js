import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { initializePassport } from './src/config/passport.js';
import { errorHandler } from './src/middlewares/errorHandler.js';

import usersRouter from './src/routes/users.router.js';
import businessRouter from './src/routes/business.router.js';
import ordersRouter from './src/routes/orders.router.js';
import notificationsRouter from './src/routes/notifications.router.js';
import sessionsRouter from './src/routes/sessions.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

initializePassport();
app.use(passport.initialize());

app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/notifications', notificationsRouter);

app.use(errorHandler);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(MONGO_URL)
    .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
    })
    .catch(err => {
    console.error('Error al conectar a MongoDB', err);
    });
