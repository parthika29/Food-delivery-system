import mongoose from 'mongoose';

const menuSchema = mongoose.Schema({
  chefRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
