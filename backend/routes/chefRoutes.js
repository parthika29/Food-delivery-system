import express from 'express';
import { registerChef, loginChef, getChefProfile } from '../controllers/chefController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerChef);
router.post('/login', loginChef);
router.get('/profile', auth, getChefProfile);

export default router;
