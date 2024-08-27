const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find({}));
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const createNewBlog = async (req, res) => {
  const { title, authors, content, publishedAt } = req.body;
  try {
    const newBlog = new Blog({
      title,
      authors,
      content,
      publishedAt,
    });

    await newBlog.save();
    res.status(201).send(newBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const getBlogById = (req, res) => {
  return res.send(req.reqBlog);
};

const updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updatedBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

module.exports = {
  getBlogs,
  createNewBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
