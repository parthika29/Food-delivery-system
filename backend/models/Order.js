import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chefRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menuRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    items: [{ name: String, quantity: Number, price: Number }],
    total: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliveryAddress: String,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
