import express from 'express';
import { getOrders, getOrderById, createOrder, updateOrderStatus } from '../controller/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id/status', protect, updateOrderStatus);

export default router;
