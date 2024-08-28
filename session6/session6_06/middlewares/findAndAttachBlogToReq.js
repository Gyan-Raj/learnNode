const BlogService = require("../services/blog.service");
const BlogServiceInstance = new BlogService();

const findAndAttachBlogToReq = async (req, res, next) => {
  const reqBlog = BlogServiceInstance.getById(req.params.id);
  if (reqBlog) {
    req.reqBlog = reqBlog; //if we have a blog with the id, we are attaching a key called "reqBlog " to the req with value nothing but the blog with that id (reqBlog)
    return next();
  } else {
    res.status(404).send({ message: "Could not find a blog with this id" });
  }
};

module.exports = findAndAttachBlogToReq;
