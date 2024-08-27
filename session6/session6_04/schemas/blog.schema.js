const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, maxlength: 25 },
    twitterHandle: { type: String },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: {
        validator: (value) =>
          validator.isEmail(value, { host_blacklist: ["gmail.com"] }), //gmail.com is blacklisted
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    image: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value, { protocols: ["https"] }), //only urls with https are allowed
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      cast: false,
      required: [true, `"title" is a required field`],
      unique: true,
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
