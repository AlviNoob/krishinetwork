import express from 'express';
import { addProduct, findProductById, getAllProducts, removeProduct, updateProductDescription } from '../controllers/productcontroller.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up file upload handling with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/images';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure folder exists before saving
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  }
});

const upload = multer({ storage: storage });

const productRoutes = express.Router();

// Add Product route
productRoutes.post('/add', upload.single('productImage'), addProduct);

// Fetch all products route
productRoutes.get('/all', getAllProducts);

// Remove product route
productRoutes.post('/remove', removeProduct);
productRoutes.get("/:id", findProductById);
productRoutes.put("/:id/description", updateProductDescription);
export default productRoutes;
