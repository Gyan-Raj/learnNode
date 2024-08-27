const Blog = require("../models/blog.model");

const getBlogs = (req, res) => {};

// const createNewBlog = async (req, res) => {
//   const { title, authors, content, publishedAt } = req.body;
//   try {
//     const newBlog = await Blog.create({
//       title,
//       authors,
//       content,
//       publishedAt,
//     });
//     res.send(newBlog);
//   } catch (error) {
//     res.status(500).send({ message: "Something went wrong!!!", error });
//   }
// };
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
    res.send(newBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const getBlogById = (req, res) => {};

const deleteBlogById = (req, res) => {};

const updateBlogById = (req, res) => {};

module.exports = {
  getBlogs,
  createNewBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
