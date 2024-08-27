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

const searchBlogs = async (req, res) => {
  try {
    const { title, author } = req.query;
    if (title && author) {
      return res.send(
        await Blog.find({
          $and: [
            { title: title },
            { authors: { $elemMatch: { email: author } } },
          ],
        })
      ); //find() will return all the matched values (i.e., it does not return just the first match => find is similar to filter method);
    }
    if (title) {
      return res.send(await Blog.find({ title: title })); //find() will return all the matched values (i.e., it does not return just the first match => find is similar to filter method)
    }
    if (author) {
      return res.send(
        await Blog.find({ authors: { $elemMatch: { email: author } } })
      ); //find() will return all the matched values (i.e., it does not return just the first match => find is similar to filter method)
    }
    res
      .status(422)
      .send({ message: `Atleast one of "title" or "author" must be present` });
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
