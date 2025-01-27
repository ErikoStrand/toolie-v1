const fs = require("fs");
const { ipcRenderer, remote } = require("electron");
const classesFilePath = "resources/data/classes.json";

const resizeObserver = new ResizeObserver((entries) => {
  const html = document.documentElement;
  const rect = html.getBoundingClientRect();

  // Round the values to prevent floating point issues
  const size = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };

  // Add a minimum size check to prevent disappearing
  if (size.width < 100) size.width = 100;
  if (size.height < 100) size.height = 100;

  ipcRenderer.send("resize-window", size);
});

resizeObserver.observe(document.documentElement);

function exit(which) {
  ipcRenderer.send("close-window", which);
}

// Enable click-through window
let elementArray = document.querySelectorAll(".hover-container");

elementArray.forEach(function (elem) {
  elem.addEventListener("mouseenter", () => {
    console.log("Mouse has entered!");
  });

  elem.addEventListener("mouseleave", () => {
    console.log("Mouse has left!");
  });
});

function getEntireClasses() {
  if (fs.existsSync(classesFilePath)) {
    const data = fs.readFileSync(classesFilePath, "utf-8");
    const classes = JSON.parse(data);
    return classes;
  }
}
// Förr att få alla namn och klasser...
function getNames(className) {
  if (fs.existsSync(classesFilePath)) {
    const data = fs.readFileSync(classesFilePath, "utf-8");
    const classes = JSON.parse(data);

    const classDetails = classes[className] || [];
    // Returna json
    return classDetails; // Return the class details if found
  } else {
    console.warn("No classes found. The file does not exist yet.");
    return null;
  }
}

// För att få alla klasser
function getClasses() {
  if (fs.existsSync(classesFilePath)) {
    // Läsa json fil
    const data = fs.readFileSync(classesFilePath, "utf-8");
    const classes = JSON.parse(data);

    const classDetails = Object.keys(classes);
    // Returna json
    return classDetails;
  } else {
    console.warn("Inga klasser hittade!");
    return [];
  }
}

// Initialize clock display
displayTime();

function displayTime() {
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const timeString = hours + ":" + minutes + ":" + seconds;
    clockElement.innerHTML = timeString;
  }
}
setInterval(displayTime, 1000);

ipcRenderer.on("toggle-klocka", (msg) => {
  console.log("Ipc Toggle");
  toggleClock();
});

function toggleClock() {
  //DEN HÄRA GÖMMER/VISAR KLOCKAN
  console.log("Toggle Clock");
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    if (clockElement.style.display === "none") {
      console.log("Toggle Visible");
      clockElement.style.display = "block"; // Show the clock
    } else {
      clockElement.style.display = "none"; // Hide the clock
    }
  }
}
