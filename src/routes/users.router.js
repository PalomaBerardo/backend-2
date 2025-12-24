import { Router } from 'express';
import { getUsers, createUser } from '../controllers/users.controller.js';
import { requireCurrent, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', requireCurrent, authorizeRoles('admin'), getUsers);
router.post('/', requireCurrent, authorizeRoles('admin'), createUser);

export default router;