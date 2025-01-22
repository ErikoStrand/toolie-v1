const fs = require("fs");

var textArea = document.getElementById("RepoText");
var repoButton = document.getElementById("getRepoButton");

async function getCommits() {
  fs.readFile("resources/data/commit_history.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to load json", err);
      return;
    }
    console.log(data);
  });
}

repoButton.addEventListener("click", getCommits);
