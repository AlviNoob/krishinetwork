import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
import session from "express-session";

import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import expertRoutes from "./routes/ExpertRoutes.js";
import productRoutes from './routes/ProductRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import blogRoutes from './routes/blogRoutes.js'; 
import educationRoutes from './routes/educationRoutes.js';

const app = express();
const port = 4000;

// Session middleware setup
app.use(session({
    secret: "your_secret_key", // Change to a secure value in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes); 
app.use("/sellers", sellerRoutes); // ✅ Ensure seller routes are registered
app.use("/expert", expertRoutes);
app.use('/products', productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/blogs", blogRoutes);
app.use('/api/education', educationRoutes);
// File Upload Setup using multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = "uploads/images";
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true }); // Ensure folder exists before saving
//         }
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
//     }
// });

// const upload = multer({ storage: storage });

// // Serve static files from the 'uploads/images' directory
// app.use("/images", express.static("uploads/images"));

// // File upload endpoint
// app.post("/upload", upload.single("productImage"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: 0, message: "File upload failed" });
//     }
//     // Send back the image URL
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     });
// });
app.use(
    "/images",
    express.static(path.join(process.cwd(), "uploads", "images"))
  );
// MongoDB Connection
mongoose.connect("mongodb+srv://alvisakiborin:01402864581@cluster0.l9iaiih.mongodb.net/myDatabase")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

// Routes
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Start server
app.listen(port, (error) => {
    if (error) {
        console.error("Error starting the server:", error);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});


