let PORT = 8082;

const http = require("http");
const crypto = require("crypto");

const server = http.createServer((req, res) => {
  let reqId = crypto.randomUUID();
  console.log(reqId);
  if (req.url === "/") {
    const serverInfo = {
      serverName: "Session1_4 server",
      version: "1.0.0",
      currentDate: new Date().toDateString(),
      currentTime: new Date().toTimeString(),
    };
    res.writeHead(200, {
      "Content-Type": "application/json",
      "x-req-id": reqId,
    });
    res.write(JSON.stringify(serverInfo));
  } else if (req.url === "/users") {
    res.writeHead(200, { "Content-Type": "text/html", "x-req-id": reqId });
    res.write(`
      <h1>Hello Users</h1>
      <ul>
        <li>User1</li>
        <li>User2</li>
        <li>User3</li>
      </ul>
      `);
  } else {
    res.writeHead(400, { "Content-Type": "text/html", "x-req-id": reqId });
    res.write(`
      <h1>Page not found</h1>
      `);
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
