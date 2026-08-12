const fs = require("fs");

fs.writeFile("imo.txt", "gugu gaga", (error) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("loading loading");
});