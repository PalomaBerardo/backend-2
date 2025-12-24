import { Router } from 'express';
import { getOrders, createOrder } from '../controllers/orders.controller.js';
import { requireCurrent, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', requireCurrent, authorizeRoles('admin'), getOrders);
router.post('/', requireCurrent, authorizeRoles('user'), createOrder);

export default router;