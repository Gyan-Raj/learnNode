const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  fullName: { type: String, maxlength: 25 },
  twitterHandle: { type: String },
  email: { type: String, required: true, maxlength: 50 },
  image: { type: String },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      cast: false,
      required: [true, `"title" is a required field`],
      unique: true, //unique: true is not a validator. It's a convenient helper for building MongoDB unique indexes.
    },
    authors: [
      {
        type: authorSchema,
        cast: false,
      },
    ],
    content: {
      type: String,
      default: "",
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = blogSchema;
