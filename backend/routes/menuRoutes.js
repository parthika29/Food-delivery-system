import express from 'express';
import { getMenus, getMenuById, createMenu } from '../controller/menuController.js';
import { protect, chef } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', protect, chef, createMenu);

export default router;
