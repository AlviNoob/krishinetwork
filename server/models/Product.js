import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  old_price: {
    type: Number,
    required: true,
    min: 0
  },
  new_price: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['buy', 'sell', 'rent'],
    required: true
  },
  image: {
    type: String,
    required: true // Base64 string is required
  },
  description: {
    type: String,
    default: ''
  }
});

export default mongoose.model('Product', productSchema);
