const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

// Middleware
app.use(express.json());
app.use(cors());

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "upload/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB connection
mongoose.connect("mongodb+srv://alvisakiborin:01402864581@cluster0.l9iaiih.mongodb.net/", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const Product = mongoose.model("Product", { 
    id: { 
      type: Number, 
      required: true, 
    }, 
    name: { 
      type: String, 
      required: true, 
    }, 
    image: { 
      type: String, 
      required: true, 
    }, 
    new_price: { 
      type: Number, 
      required: true, 
    }, 
    old_price: { 
      type: Number, 
      required: true, 
    }, 
    date: { 
      type: Date, 
      default: Date.now 
    }, 
    available: {  
      type: Boolean, 
      default: true 
    }
  });
app.post("/addproduct", async (req, res) => {
    try {
      let products = await Product.find({});
      let id;
  
      if (products.length > 0) {
        let last_product_array = products.slice(-1);  // Fixed typo: 'product' → 'products'
        let last_product = last_product_array[0];
        id = last_product.id + 1;
      } else {
        id = 1;
      }
  
      const { name, image, new_price, old_price, available } = req.body;
      const product = new Product({
        id, name, image, new_price, old_price, available
      });
  
      console.log(product);  
      await product.save();  
      console.log("saved");
  
      // Sending the success response
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
  });


app.post('/removeproduct', async (req, res)=>{ 
    await Product.findOneAndDelete({id:req.body.id}); 
    console.log("Removed"); 
    res.json({ 
    success:true, 
    name:req.body.name 
    }) 
    })  


const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "File upload failed" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
app.get('/allproducts', async (req, res) => {
    try {
      let products = await Product.find({});
      console.log("All Products Fetched");
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: err.message
      });
    }
  });

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Error in starting the server", error);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});