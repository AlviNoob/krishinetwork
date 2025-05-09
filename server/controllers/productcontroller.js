import Product from '../models/Product.js';

// Add Product Controller
export const addProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    let id;
    if (products.length > 0) {
      const lastProduct = products[products.length - 1];
      id = lastProduct.id + 1;
    } else {
      id = 1;
    }

    const { name, new_price, old_price, available, category } = req.body;

    const image = req.file ? `http://localhost:${process.env.PORT || 4000}/images/${req.file.filename}` : null;

    const product = new Product({
      id,
      name,
      image,
      new_price,
      old_price,
      available,
      category
    });

    await product.save();
    console.log("Product saved:", product);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: err.message
    });
  }
};

// Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("All Products Fetched");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

// Remove a product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedProduct = await Product.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product removed:", deletedProduct);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
      product: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: err.message,
    });
  }
};

export const findProductById = async (req, res) => {
    try {
      // Get the product ID from the request parameters
      const { id } = req.params;
  
      // Find the product by ID
      const product = await Product.findOne({ id });
  
      // If product not found, return an error
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // Return the product if found
      res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      // Handle error
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: err.message,
      });
    }
};



export const updateProductDescription = async (req, res) => {
  try {
    const productId    = Number(req.params.id);
    const { description } = req.body;

    if (typeof description !== "string") {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    const updated = await Product.findOneAndUpdate(
      { id: productId },
      { description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
};


