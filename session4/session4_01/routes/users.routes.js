const express = require("express");
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");

const router = express.Router();

const verifyAuth = require("../middlewares/verifyAuth");

router.use(verifyAuth);

router.get("/", getUsers);
router.get("/search", searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
