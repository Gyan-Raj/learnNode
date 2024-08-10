let PORT = 8082;

const http = require("http");

const server = http.createServer((req, res) => {
  const serverInfo = {
    serverName: "Session1_4 server",
    version: "1.0.0",
    currentDate: new Date().toDateString(),
    currentTime: new Date().toTimeString(),
  };

  res.writeHead(200, { "Content-Type": "application/json" });

  res.write(JSON.stringify(serverInfo));

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
