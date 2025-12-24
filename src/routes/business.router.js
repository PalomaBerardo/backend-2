import { Router } from 'express';
import {
    getBusiness,
    createBusiness,
    getBusinessById,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/business.controller.js';
import { requireCurrent, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getBusiness);
router.get('/:id', getBusinessById);

router.post('/', requireCurrent, authorizeRoles('admin'), createBusiness);

router.post('/:id/products', requireCurrent, authorizeRoles('admin'), addProduct);
router.put('/:id/products/:pid', requireCurrent, authorizeRoles('admin'), updateProduct);
router.delete('/:id/products/:pid', requireCurrent, authorizeRoles('admin'), deleteProduct);

export default router;
