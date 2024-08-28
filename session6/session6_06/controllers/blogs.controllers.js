const BlogService = require("../services/blog.service");
const BlogServiceInstance = new BlogService();

const getBlogs = async (req, res) => {
  try {
    res.send(await getAll());
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const createNewBlog = async (req, res) => {
  try {
    const newBlog = BlogServiceInstance.create(req.body);
    await BlogServiceInstance.save(newBlog);
    res.status(201).send(newBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Validation error
      return res.status(400).send({ message: error.message });
    } else if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).send({ message: "Title must be unique." });
    } else {
      res.status(500).send({ message: "Something went wrong!!!", error });
    }
  }
};

const getBlogById = (req, res) => {
  try {
    return res.send(req.reqBlog);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(422).send({ message: "Invalid blog id" });
    } else {
      res.status(500).send({ message: "Something went wrong!!!", error });
    }
  }
};

const updateBlogById = async (req, res) => {
  try {
    const updatedBlog = await BlogServiceInstance.updateById(req.params.id, req.body);
    res.send(updatedBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    await BlogServiceInstance.deleteById(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const searchBlogs = async (req, res) => {
  try {
    const { title, author } = req.query;
    if (title && author) {
      return res.send(await BlogServiceInstance.searchByTitleAndAuthor(title, author));
    }
    if (title) {
      return res.send(await BlogServiceInstance.searchByTitle(title));
    }
    if (author) {
      return res.send(await BlogServiceInstance.searchByAuthor(author));
    }
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
  searchBlogs,
};
