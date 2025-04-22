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
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

// Start the server
app.listen(port, (error) => {
    if (error) {
        console.log("Error in starting the server", error);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});