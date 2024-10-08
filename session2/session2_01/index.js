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
  res.header({ "content-type": "application/json" }).send(currenciesJSON.data); //we don't have to stringify even, as express will do it implicitly
});
app.get("/currencies/:symbol", (req, res) => {
  console.log(req.params); //this will give us the parameter passed, and depending upon that we will return a response. //for http://localhost:8082/currencies/inr, it will console an object with key called "symbol" and value as "inr", i.e., {symbol:"inr"}
  console.log(req.params.symbol); //for http://localhost:8082/currencies/inr, it will console "inr"
  //So, now we need to match this params from our database and just need to return that object
  //we will be using find() function as we are searching for something which is unique
  //So, as currenciesJSON is an object with key called "data", and that data is an array of objects, so will implement find() (which is an array method and not an object method) on currenciesJSON.data (which is an array) and on just on currenciesJSON (which is an object)

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
//we don't have to write default case. If path is something other than "/" or "/currencies", express will automatically return 404

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
