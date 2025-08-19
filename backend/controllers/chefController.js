import User from '../models/User.js';
import Chef from '../models/Chef.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerChef = async (req, res) => {
  try {
    const { name, email, password, address, phone, bio, specialties } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, phone, role: 'chef' });
    const chef = await Chef.create({ user: user._id, bio, specialties });
    res.status(201).json({ message: 'Chef registered successfully', user: { id: user._id, name: user.name, email: user.email }, chef });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const loginChef = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'chef' });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const chef = await Chef.findOne({ user: user._id });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }, chef });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getChefProfile = async (req, res) => {
  try {
    const chef = await Chef.findOne({ user: req.user.id }).populate('user', '-password');
    if (!chef) return res.status(404).json({ message: 'Chef profile not found' });
    res.json(chef);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
