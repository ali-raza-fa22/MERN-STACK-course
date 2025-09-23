import url from "url";
import http from "http";

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const pathname = q.pathname;
  const query = q.query;

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write(`Pathname: ${pathname}`);
  res.write(`Query Parameteers: ${JSON.stringify(query)}`);

  res.end();
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});
