import { Router } from 'express';
import { register, login, current, forgotPassword, resetPassword } from '../controllers/sessions.controller.js';
import { requireCurrent } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/current', requireCurrent, current);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
