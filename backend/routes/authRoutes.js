import express from 'express';
import { registerCustomer, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', registerCustomer);

// Login
router.post('/login', login);

// Get logged-in user info
router.get('/me', protect, getMe);

export default router;
