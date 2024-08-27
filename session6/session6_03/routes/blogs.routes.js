const express = require("express");
const router = express.Router();

const {
  getBlogs,
  createNewBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogs.controllers");
const findAndAttachBlogToReq = require("../middlewares/findAndAttachBlogToReq");

router.get("/", getBlogs);
router.post("/new", createNewBlog);

router.get("/:id", findAndAttachBlogToReq, getBlogById);
router.patch("/:id", findAndAttachBlogToReq, updateBlogById);
router.delete("/:id", findAndAttachBlogToReq, deleteBlogById);

module.exports = router;
