const Blog = require("../models/blog.model");

class BlogService {
  getAll = () => {
    return Blog.find({});
  };

  // create = async (payload) => {
  //   const newBlog = new Blog(payload);
  //   await newBlog.save();
  //   return newBlog;
  // };

  //the create method above is basically performing two tasks: creating and then saving. So, we can separate these two tasks in two methods
  create = (payload) => new Blog(payload);
  save = async (newBlog) => await newBlog.save();

  getById = (blogId) => Blog.findById(blogId);

  updateById = (blogId, payload) =>
    Blog.findByIdAndUpdate(blogId, payload, {
      new: true,
    });

  deleteById = (blogId) => Blog.findByIdAndDelete(blogId);

  searchByTitle = (title) =>
    Blog.find({ title: { $regex: new RegExp(title), $options: "i" } });

  searchByAuthor = (author) =>
    Blog.find({ authors: { $elemMatch: { email: author } } });

  searchByTitleAndAuthor = (title, author) =>
    Blog.find({
      $and: [
        { title: { $regex: new RegExp(title), $options: "i" } },
        { authors: { $elemMatch: { email: author } } },
      ],
    });
}

module.exports = BlogService;
