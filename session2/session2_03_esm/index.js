import express from "express";
const app = express();
const PORT = 8082;

import {
  getCurrencies,
  getCurrencyBySymbol,
} from "./controllers/currencies.controllers.js";

app.get("/", (req, res) => {
  res
    .header({ "content-type": "text/html" })
    .send(`<h1>Currency Database</h1>`);
});
app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
