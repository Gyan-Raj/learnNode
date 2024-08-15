const express = require("express");
const router = express.Router();
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("../controllers/currencies.controllers");

router.get("/", getCurrencies);

router.get("/:symbol", getCurrencyBySymbol);

module.exports = router;
