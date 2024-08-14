const express = require("express");
const app = express();
const PORT = 8082;

const userRouter = require("./routes/users.routes");
const currencyRouter = require("./routes/currencies.routes");

app.get("/", (req, res) => {
  res
    .header({ "content-type": "text/html" })
    .send(`<h1>Currency Database</h1>`);
});

app.use("/currencies", currencyRouter); //to use the routes, we have a function in the express app object called use() that takes in two parameters:- route (string), i.e., "/currencies", and middleware for the route → Here it will be the object we imported,i.e., currencyRouter.

app.use("/users", userRouter); //to use the routes, we have a function in the express app object called use() that takes in two parameters:- route (string),  i.e., "/users" and middleware for the route → Here it will be the object we imported, i.e., userRouter.

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
