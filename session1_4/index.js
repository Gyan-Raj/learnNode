let PORT = 8082;

const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  const serverInfo = {
    serverName: "Session1_4 server",
    version: "1.0.0",
    currentDate: new Date().toDateString(),
    currentTime: new Date().toTimeString(),
  };

  let reqId = crypto.randomUUID();
  res.writeHead(200, { "Content-Type": "application/json", "x-req-id": reqId });
  console.log(reqId);

  res.write(JSON.stringify(serverInfo));

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
