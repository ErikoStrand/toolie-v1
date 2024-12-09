const { ipcRenderer } = require("electron");

// Get all available classes
const classes = getClasses();
let selectedKlass = [];
// DOM Elements

// Populate Dropdown with Classes
function populateDropdown() {
  classes.forEach((classKey) => {
    const option = document.createElement("option");
    option.value = classKey;
    option.textContent = classKey;
    classDropdown.appendChild(option);
  });

  // Select first class by default
  if (classes.length > 0) {
    classDropdown.value = classes[0];
    getNamesFromClass();
  }
}
function exit() {
  ipcRenderer.send("close-window");
}
function getNamesFromClass() {
  const selectedClass = classDropdown.value;
  namesList.innerHTML = "";
  selectedKlass = getNames(selectedClass);
  displayNames();
}
// Display Names for Selected Class
function displayNames() {
  namesList.innerHTML = "";
  selectedKlass.forEach((name) => {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    p.textContent = name;
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("defaultDelete");

    // Add delete functionality
    deleteBtn.addEventListener("click", () => {
      const index = selectedKlass.indexOf(name);
      if (index > -1) {
        selectedKlass.splice(index, 1);
        li.remove();
      }
    });

    namesList.appendChild(li);

    div.appendChild(checkbox);
    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(deleteBtn);
  });
}

function addName() {
  let name = document.getElementById("nameAdd");
  if (name.value === "") {
    return;
  }
  selectedKlass.push(name.value);
  displayNames();
  name.value = "";
}

classDropdown.addEventListener("change", getNamesFromClass);
populateDropdown();

function slumpAName() {
  const checkboxes = document.querySelectorAll(
    '#namesList input[type="checkbox"]'
  );

  const selectedCheckboxes = Array.from(checkboxes).filter((cb) => cb.checked);

  let namePool;

  if (selectedCheckboxes.length > 0) {
    namePool = selectedCheckboxes.map(
      (cb) => cb.nextElementSibling.textContent
    );
  } else {
    namePool = selectedKlass;
  }

  if (namePool.length > 0) {
    let random = Math.floor(Math.random() * namePool.length);
    document.getElementById("slumpName").textContent = namePool[random];
  } else {
    document.getElementById("slumpName").textContent = "No names available";
  }
}

function selectAll() {
  const master = document.getElementById("mastercheckbox");
  const checkboxes = document.querySelectorAll(
    '#namesList input[type="checkbox"]'
  );
  if (master.checked) {
    Array.from(checkboxes).map((cb) => (cb.checked = true));
  } else {
    Array.from(checkboxes).map((cb) => (cb.checked = false));
  }
}
