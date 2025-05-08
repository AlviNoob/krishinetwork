// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  id:        { type: Number, required: true },
  name:      { type: String, required: true },
  image:     { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  category:  { type: String, required: true },
  description: { type: String, default: "" },      // ← add this
  date:      { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

export default mongoose.model("Product", ProductSchema);
