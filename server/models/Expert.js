// models/Expert.js
import mongoose from "mongoose";

const ExpertSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  phone:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  specialization:{ type: String, required: true },
  addedBy:      { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  description:  { type: String, default: "" },
  photoUrl:     { type: String, default: "" },
});

export default mongoose.model("Expert", ExpertSchema);
