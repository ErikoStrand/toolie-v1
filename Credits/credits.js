const fs = require("fs");
const { get } = require("http");

const scrollText = document.querySelector(".scroll-text");
const contentHeight = scrollText.offsetHeight;
const animationDistance = contentHeight * -1; // Scroll entire height
scrollText.style.animation = `scroll 60s linear forwards`;
scrollText.style.setProperty("--animationDistance", `${animationDistance}px`);

function getCommits() {
  fs.readFile("resources/data/commit_history.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Failed to load json", err);
      return;
    }
    const parsedData = JSON.parse(data);
    let textContainer = document.getElementById("text-container");

    // Add commits to container
    for (let i = parsedData.length - 1; i >= 0; i--) {
      let p = document.createElement("p");
      p.textContent = `${parsedData[i].author}: ${parsedData[i].message}`;
      textContainer.appendChild(p);
    }

    // Calculate and set animation properties
    const contentHeight = textContainer.offsetHeight;
    const scrollDistance = contentHeight * -1;
    const duration = contentHeight / 0.05; // Adjust speed factor as needed

    document.documentElement.style.setProperty(
      "--scrollDistance",
      `${scrollDistance}px`
    );
    document.documentElement.style.setProperty(
      "--scrollDuration",
      `${duration}s`
    );
  });
}

getCommits();
