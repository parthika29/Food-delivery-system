import User from '../models/User.js';
import Order from '../models/Order.js';
import Menu from '../models/Menu.js';

// Get all chefs
export const getAllChefs = async (req, res) => {
  try {
    const chefs = await User.find({ role: 'chef' }).select('-password');
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userRef', 'name email')
      .populate('chefRef', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Block a user
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.blocked = true;
    await user.save();
    res.json({ message: 'User blocked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Unblock a user
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.blocked = false;
    await user.save();
    res.json({ message: 'User unblocked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all menus
export const getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('chefId', 'name email');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
