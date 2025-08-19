import User from '../models/User.js';
import Order from '../models/Order.js';

// Get orders of logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userRef: req.user._id })
      .populate('chefRef', 'name email')
      .populate('menuRef', 'title price');
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// Update logged-in user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Make sure password is hashed in model pre-save hook

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};
