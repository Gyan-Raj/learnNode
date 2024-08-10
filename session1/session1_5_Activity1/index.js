const http = require("http");
const crypto = require("crypto");
const currensiesJSON = require("./currencies.json");
const PORT = 8082;
const server = http.createServer((req, res) => {
  let reqId = crypto.randomUUID();
  switch (req.url) {
    case "/":
      res.writeHead(200, { "content-type": "text/html", "x-req-id": reqId });
      res.write(`<h1>Currency Database</h1>`);
      break;
    case "/currencies":
      res.writeHead(200, {
        "content-type": "application/json",
        "x-req-id": reqId,
      });
      res.write(JSON.stringify(currensiesJSON));
      break;
    default:
      res.writeHead(404, { "content-type": "text/html", "x-req-id": reqId });
      res.write(JSON.stringify({ message: `${req.url} does not exist` }));
  }
  res.end();
});
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
