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
