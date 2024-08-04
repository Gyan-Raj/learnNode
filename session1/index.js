console.log("Server started");
console.log("Server running");
console.log("Server running");

const http = require("http"); //With Node.js installation we get a module named http, which is used to create the server(http.createServer((req,res)=>{})) using Node.js which can receive requests(req) and return a response(res)

const server = http.createServer((req, res) => {
}); //Use the createServer method on the http module to create a server. The createServer() method takes in a callback which is executed once the server receives a request from the client.
  console.log("Request received");
let PORT = 8082;
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); //Finally we make this server instance “listen” for any requests. Specify the PORT number as the first argument (say 8082), and a success callback as the second argument
