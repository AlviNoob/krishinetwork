import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import session from "express-session";
import { fileURLToPath } from 'url';

import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import expertRoutes from "./routes/ExpertRoutes.js";
import productRoutes from './routes/ProductRoutes.js';
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port = 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Session middleware setup
app.use(session({
    secret: "your_secret_key", // Change to a secure value in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to `true` if using HTTPS
}));

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/users", userRoutes); 
app.use("/sellers", sellerRoutes);
app.use("/expert", expertRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// MongoDB Connection
mongoose.connect("mongodb+srv://alvisakiborin:01402864581@cluster0.l9iaiih.mongodb.net/myDatabase")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

// Root route
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
