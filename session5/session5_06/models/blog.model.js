const mongoose = require("mongoose");

const blogSchema = require("../schemas/blog.schema");

const blogModel = mongoose.model("Blogs", blogSchema, "blogs");
//.model takes in 3 arguments: name of model ("Blogs"); schema it will follow (blogSchema); and name of collection which is optional (blogs)
//it is general convention to keep the first letter of the name of model in Uppercase (i.e., "Blogs", and not "blogs"). NOTE: as this is optional, so when we do not give any collection name, it will by default add a "s" to model name => if model name is "Blog", the by default collection name will be "Blogs"

module.exports = blogModel;
