const fs = require("fs");

async function getCommits() {
  fs.readFile("resources/data/commit_history.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to load json", err);
      return;
    }
    parsedData = JSON.parse(data);
    let textContainer = document.getElementById("text-container");
    for (let i = parsedData.length - 1; i >= 0; i--) {
      console.log(`${parsedData[i].author}: ${parsedData[i].message}`);
      let p = document.createElement("p");

      p.textContent = `${parsedData[i].author}: ${parsedData[i].message}`;
      textContainer.appendChild(p);
    }
  });
}
