import Menu from '../models/Menu.js';

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('chefId', 'name email');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMenu = async (req, res) => {
  try {
    const menu = new Menu({ ...req.body, chefId: req.user._id });
    const createdMenu = await menu.save();
    res.status(201).json(createdMenu);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
