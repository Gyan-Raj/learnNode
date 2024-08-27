const getBlogs = (req, res) => {};

const createNewBlog = (req, res) => {
  console.log(req.body);
  res.send("ok");
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
