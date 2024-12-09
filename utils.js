const { ipcRenderer, remote } = require("electron");

function exit() {
  ipcRenderer.send("close-window");
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

function displayTime() {
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var timeString = hours + ":" + minutes + ":" + seconds;
  document.getElementById("clock").innerHTML = timeString;
}
setInterval(displayTime, 1000);
