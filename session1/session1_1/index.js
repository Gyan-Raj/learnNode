let PORT = 8082;

const http = require("http");

const server = http.createServer((req, res) => {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  console.log(date, time);
  res.end(); //The res object has a special function end() which we can call to mark the end of the response. This will make sure the request is completed.
  //BUT, ending the response is just not enough, we also want to send data to the client.

  //To send some information back to the client like a JSON or an HTML string. We use res.write() function which takes the data to be returned as an argument. It is in form of a string. We will do it in session1_2
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
