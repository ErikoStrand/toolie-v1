// Get all available classes
const classes = getClasses();
let selectedKlass = [];
// DOM Elements
const classDropdown = document.getElementById("classDropdown");
const namesList = document.getElementById("namesList");
const addNameBtn = document.getElementById("addNameBtn");

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

function slumpAName() {
  let checked = false;
  const checkboxes = document.querySelectorAll(
    '#namesList input[type="checkbox"]'
  );
  const allNamesOfCheckboxes = Array.from(checkboxes).map(
    (cb) => cb.nextElementSibling.textContent
  );
  const selectedCheckboxes = Array.from(checkboxes).filter((cb) => cb.checked);
  let namePool;

  if (selectedCheckboxes.length > 0) {
    namePool = selectedCheckboxes.map(
      (cb) => cb.nextElementSibling.textContent
    );
    checked = true;
  } else {
    namePool = selectedKlass;
  }
  if (namePool.length > 0) {
    let random = Math.floor(Math.random() * namePool.length);
    let randomName = namePool[random];
    document.getElementById("slumpName").textContent = randomName;
    if (checked) {
      namePool.splice(namePool.indexOf(randomName), 1);
      checkboxes[allNamesOfCheckboxes.indexOf(randomName)].checked = false;
      if (namePool.length <= 0) {
        document.getElementById("mastercheckbox").checked = false;
      }
    }
    document.getElementById("slumpName").style = "padding: 4px";
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

classDropdown.addEventListener("change", getNamesFromClass);
populateDropdown();
