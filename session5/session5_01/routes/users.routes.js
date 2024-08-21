const express = require("express");
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");

const router = express.Router();

const verifyAuth = require("../middlewares/verifyAuth");

router.use(verifyAuth);

const userSearchValidator = require("../validations/userSearch.validation");
const uuidValidator = require("../validations/uuid.validations");

router.get("/", getUsers);
router.get("/search", userSearchValidator, searchUsers);
router.get("/:uuid", uuidValidator, getUserById);

module.exports = router;
