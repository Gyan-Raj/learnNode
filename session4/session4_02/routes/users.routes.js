const express = require("express");
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");

const router = express.Router();

const verifyAuth = require("../middlewares/verifyAuth");

router.use(verifyAuth);

const validator = require("../middlewares/validators");
const userSearchSchema = require("../validations/userSearch.validation");

router.get("/", getUsers);
router.get("/search", validator(userSearchSchema), searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
