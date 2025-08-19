import express from 'express';
const router = express.Router();

import { protect, admin } from '../middleware/auth.js';
import { 
  getAllChefs, 
  getAllOrders, 
  blockUser, 
  unblockUser, 
  getAllMenus   // ✅ naam ab match kar raha hai
} from '../controllers/adminController.js';

// @desc    Get all chefs
// @route   GET /api/admin/chefs
// @access  Admin
router.get('/chefs', protect, admin, getAllChefs);

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin
router.get('/orders', protect, admin, getAllOrders);

// @desc    Block a user
// @route   PUT /api/admin/block-user/:id
// @access  Admin
router.put('/block-user/:id', protect, admin, blockUser);

// @desc    Unblock a user
// @route   PUT /api/admin/unblock-user/:id
// @access  Admin
router.put('/unblock-user/:id', protect, admin, unblockUser);

// @desc    View all menus
// @route   GET /api/admin/menus
// @access  Admin
router.get('/menus', protect, admin, getAllMenus);

export default router;
