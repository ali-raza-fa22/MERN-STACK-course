import fs from "fs";
import path from "path";

fs.readFile("example.txt", "utf-8", (err, data) => {
  if (err) throw err;

  console.log(data);
});

console.log(path.basename(__filename));
