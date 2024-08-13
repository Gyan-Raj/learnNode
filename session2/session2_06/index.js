const express = require("express");
const app = express();
const PORT = 8082;

const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("./controllers/users.controllers");

app.get("/", (req, res) => {
  res
    .header({ "content-type": "text/html" })
    .send(`<h1>Currency Database</h1>`);
});
app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

app.get("/users", getUsers);

app.get("/users/search", searchUsers); //?gender=<string>&age=<number>

app.get("/users/:uuid", getUserById);

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
