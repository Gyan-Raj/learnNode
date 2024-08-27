const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find({})); //OR res.send(await Blog.find());
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

// const createNewBlog = async (req, res) => {
//   const { title, authors, content, publishedAt } = req.body;
//   try {
//     const newBlog = await Blog.create({
//       title,
//       authors,
//       content,
//       publishedAt,
//     });
//     res.status(201).send(newBlog);
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
    res.status(201).send(newBlog);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

const getBlogById = async (req, res) => {
  try {
    const reqBlog = await Blog.findById(req.params.id);
    if (reqBlog) {
      return res.send(reqBlog);
    } else {
      return res
        .status(404)
        .send({ message: "Could not find a blog with this id" }); //to handle the case when given id (which is valid) is not present in database
    }
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      //to handle any invalid id
      return res.status(422).send({ message: "Invalid blog id" });
    } else {
      res.status(500).send({ message: "Something went wrong!!!", error });
    }
  }
};

const updateBlogById = async (req, res) => {
  try {
    const reqBlog = await Blog.findById(req.params.id);
    if (reqBlog) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnDocument: "after",
        }
      );
      res.send(updatedBlog);
    } else {
      res.status(404).send({ message: "Could not find a blog with this id" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong!!!", error });
  }
};

// const updateBlogById = async (req, res) => {
//   try {
//     const reqBlog = await Blog.findById(req.params.id);
//     if (reqBlog) {
//       //we will update only if the blog with given id exists
//       const updatedBlog = await Blog.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );
//       res.send(updatedBlog);
//     } else {
//       //we will handle the case when user tries to update with an id which does not exist
//       res.status(404).send({ message: "Could not find a blog with this id" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Something went wrong!!!", error });
//   }
// };

const deleteBlogById = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.sendStatus(204); //status code 204 is used for delete requests which basically signifies "no content"
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
