import { createServer } from "http";
import { parse } from "url";

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/user") {
    const name = parsedUrl.query.name;
    if (name) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Hello, ${name}!`);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Name parameter is required");
    }
  } else if (pathname === "/time") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Current server time: ${new Date().toISOString()}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
