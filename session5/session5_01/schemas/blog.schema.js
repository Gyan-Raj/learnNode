const mongoose = require("mongoose");

//NOTE: The first letter of datatypes are written in Capital
const blogSchema = new mongoose.Schema({
  title: String, //Title is string
  authors: [String], //Authors is an array of strings
  content: String, //Content is string
  publishedAt: Date, //publishedAt is Date //NOTE:Date is a special datatype that is offered by mongoDB (which uses BSON), it is not present in JSON
});

// This schema will also trigger an internal validator for data types when storing data to DB.

module.exports = blogSchema;
