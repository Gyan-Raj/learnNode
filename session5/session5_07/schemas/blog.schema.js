const mongoose = require("mongoose");

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
        type: String,
        required: [true, `"authors" is a required field`],
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
