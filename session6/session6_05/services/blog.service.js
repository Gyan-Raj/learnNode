const Blog = require("../models/blog.model");

const getAll = () => {
  return Blog.find({});
};
const create = async (payload) => {
  const newBlog = new Blog(payload);
  await newBlog.save();
  return newBlog;
};
const getById = (blogId) => {
  return Blog.findById(blogId);
};
const updateById = (blogId, payload) => {
  return Blog.findByIdAndUpdate(blogId, payload, {
    new: true,
  });
};
const deleteById = (blogId) => {
  return Blog.findByIdAndDelete(blogId);
};
const searchByTitle = (title) => {
  return Blog.find({ title: { $regex: new RegExp(title), $options: "i" } });
};
const searchByAuthor = (author) => {
  return Blog.find({ authors: { $elemMatch: { email: author } } });
};
const searchByTitleAndAuthor = (title, author) => {
  return Blog.find({
    $and: [
      { title: { $regex: new RegExp(title), $options: "i" } },
      { authors: { $elemMatch: { email: author } } },
    ],
  });
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  searchByTitle,
  searchByAuthor,
  searchByTitleAndAuthor,
};
