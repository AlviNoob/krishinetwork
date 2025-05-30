const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: String,
  role: String,
  content: String,
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
