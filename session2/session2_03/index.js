const express = require("express");
const app = express(); //will create an application with express
const PORT = 8082;

const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");

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
