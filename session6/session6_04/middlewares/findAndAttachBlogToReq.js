const Blog = require("../models/blog.model");

const findAndAttachBlogToReq = async (req, res, next) => {
  try {
    const reqBlog = await Blog.findById(req.params.id);
    if (reqBlog) {
      req.reqBlog = reqBlog; //if we have a blog with the id, we are attaching a key called "reqBlog " to the req with value nothing but the blog with that id (reqBlog)
      return next();
    } else {
      res.status(404).send({ message: "Could not find a blog with this id" });
    }
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(422).send({ message: "Invalid blog id" });
    } else {
      res.status(500).send({ message: "Something went wrong!!!", error });
    }
  }
};

module.exports = findAndAttachBlogToReq;
