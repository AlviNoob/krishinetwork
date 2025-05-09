import express from 'express';
import {
  addProduct,
  findProductById,
  getAllProducts,
  removeProduct,
  updateProductDescription
} from '../controllers/productcontroller.js';

const productRoutes = express.Router();

// Middleware to support large JSON payloads (e.g., Base64 images)
productRoutes.use(express.json({ limit: '10mb' }));

// Routes
productRoutes.post('/add', addProduct); // Accept JSON with base64 image
productRoutes.get('/all', getAllProducts);
productRoutes.post('/remove', removeProduct);
productRoutes.get('/:id', findProductById);
productRoutes.put('/:id/description', updateProductDescription);

export default productRoutes;
