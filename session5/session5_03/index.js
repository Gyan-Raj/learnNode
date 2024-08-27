const express = require("express");
const app = express();
const PORT = 8082;
const { errors } = require("celebrate");

const userRouter = require("./routes/users.routes");
const currencyRouter = require("./routes/currencies.routes");
const blogRouter = require("./routes/blogs.routes");

const connectDB = require("./db/config.js");
connectDB();

app.use(express.json());  //parses the request body as json if and only if Content-Type is application/json

app.get("/", (req, res) => {
  res
    .header({ "content-type": "text/html" })
    .send(`<h1>Currency Database</h1>`);
});

app.use("/currencies", currencyRouter);

app.use("/users", userRouter);

app.use("/blogs", blogRouter);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
