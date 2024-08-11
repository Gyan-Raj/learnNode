const express = require("express");
const app = express(); //will create an application with express
const PORT = 8082;
const currenciesJSON = require("./currencies.json");

app.get("/", (req, res) => {
  res
    .header({ "content-type": "text/html" })
    .send(`<h1>Currency Database</h1>`);
});
app.get("/currencies", (req, res) => {
  console.log(req.query); //this will give us the query parameters passed, and depending upon that we will return a response. //for http://localhost:8082/currencies?min_value=0.001, it will console an object as: {min_value:"0.001"}. Similarly, for http://localhost:8082/currencies?min_value=0.001&max_value=0.01, it will console an object as: {min_value:"0.001", max_value:"0.01"}
  console.log(req.query.min_value); //for http://localhost:8082/currencies?min_value=0.001, it will give output as "0.001"
  const { min_value } = req.query;

  if (min_value) {
    res
      .header({ "content-type": "application/json" })
      .send(currenciesJSON.data.filter((curr) => curr.min_size === min_value)); //we have to be careful in using ===. Since, we can see that in currenciesJSON file, min_size is a string as well as we know that req (or url path) is also a string, so it will not give a problem. But, we have to cross check for cases when the data type of query parameter (which is always a string) and value in database are not the same.
    //NOTE: we will not have to check this when we will be directly interacting with actual databases as databases have their own queries, where we can directly query the database instead of getting entire information and then filtering it.
  } else {
    res
      .header({ "content-type": "application/json" })
      .send(currenciesJSON.data);
  }
});

app.get("/currencies/:symbol", (req, res) => {
  const { symbol } = req.params;
  const reqCurr = currenciesJSON.data.find(
    (curr) => curr.id.toLowerCase() === symbol.toLowerCase()
  );
  if (reqCurr) {
    return res.header({ "content-type": "application/json" }).send(reqCurr);
  } else {
    return res.status(404).send({ message: "invalid symbol" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
