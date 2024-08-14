const currenciesJSON = require("../currencies.json");
const getCurrencies = (req, res) => {
  const { min_value } = req.query;
  if (min_value) {
    res
      .header({ "content-type": "application/json" })
      .send(currenciesJSON.data.filter((curr) => curr.min_size === min_value));
  } else {
    res
      .header({ "content-type": "application/json" })
      .send(currenciesJSON.data);
  }
};
const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const reqCurr = currenciesJSON.data.find(
    (curr) => curr.id.toLowerCase() === symbol.toLowerCase()
  );
  if (reqCurr) {
    return res.header({ "content-type": "application/json" }).send(reqCurr);
  } else {
    return res.status(404).send({ message: "invalid symbol" });
  }
};

module.exports = {
  getCurrencies,
  getCurrencyBySymbol,
};
