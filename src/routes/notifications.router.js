import { Router } from 'express';
import { sendMail, sendSMS } from '../controllers/notifications.controller.js';

const router = Router();
router.post('/mail', sendMail);
router.get('/sms', sendSMS);

export default router;