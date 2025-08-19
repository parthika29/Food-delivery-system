import express from 'express';
import { protect } from '../middleware/auth.js';
import { getUserOrders, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Get orders of logged-in user
router.get('/orders', protect, getUserOrders);

// Update profile info
router.put('/profile', protect, updateUserProfile);

export default router;
