import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify([{ post: "post 1" }, { post: "post 2" }]));
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
