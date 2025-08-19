import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  bio: { type: String },
  specialties: [{ type: String }],
  rating: { type: Number, default: 0 },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }], // List of menus created by chef
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // List of reviews for chef
  createdAt: { type: Date, default: Date.now }
});

const Chef = mongoose.model('Chef', chefSchema);
export default Chef;
