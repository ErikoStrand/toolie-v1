const fs = require("fs");

var textArea = document.getElementById("RepoText");
var repoButton = document.getElementById("getRepoButton");

async function getCommits() {
  fs.readFile("commits.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to load json", err);
      return;
    }
    textArea.innerHTML = json.parse(`${data.author}: ${data.message}`);
  });
}

repoButton.addEventListener("click", getCommits);
