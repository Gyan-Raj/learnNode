const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createNewBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogs.controllers");

router.get("/", getBlogs);
router.post("/new", createNewBlog);

// router.get("/:id", getBlogById);
// router.patch("/:id", updateBlogById);
// router.delete("/:id", deleteBlogById);
//As, getBlogById,updateBlogById, deleteBlogById have sane route paths ("/:id"), so we can use "clubbing" of these methods. "Clubbing" is provided by express Router, and can be utilized as:
router
  .route("/:id")
  .get(getBlogById)
  .patch(updateBlogById)
  .delete(deleteBlogById);

module.exports = router;
