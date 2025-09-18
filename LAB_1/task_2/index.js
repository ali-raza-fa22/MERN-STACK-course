const fs = require("fs");

fs.readFile("data.json", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const jsonData = JSON.parse(data);
    // console.log(jsonData);
    console.log(jsonData.skills);
    jsonData.skills.push("JavaScript");
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });

    console.log(jsonData.skills);
  }
});
