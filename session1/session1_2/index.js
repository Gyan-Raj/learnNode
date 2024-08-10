let PORT = 8082;

const http = require("http");

const server = http.createServer((req, res) => {
  // const date = new Date().toLocaleDateString();
  // const time = new Date().toLocaleTimeString();
  // console.log(date, time); //To send some information back to the client like a JSON or an HTML string we use res.write() function which takes the data to be returned as an argument.
  // // res.write(date, time); //ERROR=> It should be in form of a string
  // res.write(`${date}, ${time}`); //BUT now have a look at the response in Postman.  The type of the response is “TEXT” and not “JSON”. It also looks like plain string, not an object?
  // //So, We must tell the client what “type of content” are we sending.

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(`${date}, ${time}`); //To specify the type of content, we have a function writeHead() where we can specify Headers (like “Content-Type”) and the status code for the request

  res.end();
  //we can also write re.write() and res.end() in single line, as : res.end(`${date}, ${time}`);
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
