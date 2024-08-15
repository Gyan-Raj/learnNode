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

app.use("/currencies", currencyRouter);

app.use("/users", userRouter); 

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
