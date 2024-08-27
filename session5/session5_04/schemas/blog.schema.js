const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  content: String,
  publishedAt: Date,
});

module.exports = blogSchema;
