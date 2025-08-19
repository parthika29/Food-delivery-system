import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userRef: req.user._id }).populate('chefRef', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('chefRef', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { items, total, chefRef, menuRef, deliveryAddress } = req.body;
    const order = new Order({
      userRef: req.user._id,
      chefRef,
      menuRef,
      items,
      total,
      deliveryAddress,
      status: 'pending'
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status;
    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
