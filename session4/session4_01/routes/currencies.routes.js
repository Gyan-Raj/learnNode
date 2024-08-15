const express = require("express");
const router = express.Router();
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("../controllers/currencies.controllers");

const verifyAuth=require("../middlewares/verifyAuth")

router.get("/", verifyAuth, getCurrencies);

router.get("/:symbol", getCurrencyBySymbol);

module.exports = router;
