const { ipcRenderer, remote } = require("electron");

let clickCount = 0;
let closeTimeout;
let lastClickTime = 0;

window.addEventListener("click", (e) => {
  // Prevent buttons from triggering close
  if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") {
    console.log("blicked not clicable close thing");
    return;
  }

  const currentTime = Date.now();

  // Check if clicks are close together
  if (currentTime - lastClickTime > 200) {
    clickCount = 0;
  }

  clickCount++;
  lastClickTime = currentTime;

  console.log("Clicked", clickCount);

  // Clear previous timeout
  if (closeTimeout) clearTimeout(closeTimeout);

  // Reset click count if not 3 clicks within 200ms
  closeTimeout = setTimeout(() => {
    clickCount = 0;
  }, 200);

  // Close window on 3 clicks
  if (clickCount === 3) {
    ipcRenderer.send("close-window");
  }

  // Prevent default double-click behavior
  e.preventDefault();
});

// Prevent default double-click maximize
document.addEventListener("dblclick", (e) => {
  e.preventDefault();
  return false;
});

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
