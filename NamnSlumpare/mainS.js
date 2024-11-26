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
  namesList.innerHTML = ""; // Clear previous list
  selectedKlass = getNames(selectedClass);
  displayNames();
}
// Display Names for Selected Class
function displayNames() {
  namesList.innerHTML = ""; // Clear previous list
  // Get names for selected class
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
      // Remove name from selectedKlass array
      const index = selectedKlass.indexOf(name);
      if (index > -1) {
        selectedKlass.splice(index, 1);
        // Remove the list item from the DOM
        li.remove();

        // Optional: Update backend/storage if needed
        // For example, you might want to call a function to update the file
        // updateClassFile(currentSelectedClass, selectedKlass);
      }
    });

    namesList.appendChild(li);

    div.appendChild(checkbox);
    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(deleteBtn);
  });
}

// Add New Name to Class
function addName() {
  let name = document.getElementById("nameAdd");
  if (name.value === "") {
    return;
  }
  selectedKlass.push(name.value);
  displayNames();
  name.value = "";
}

// Event Listeners
classDropdown.addEventListener("change", getNamesFromClass);
// Initial Setup
populateDropdown();

function slumpAName() {
  // Get all checkboxes in the namesList
  const checkboxes = document.querySelectorAll(
    '#namesList input[type="checkbox"]'
  );

  // Find selected checkboxes
  const selectedCheckboxes = Array.from(checkboxes).filter((cb) => cb.checked);

  // Determine the pool of names to choose from
  let namePool;

  if (selectedCheckboxes.length > 0) {
    // If some checkboxes are selected, use only those names
    namePool = selectedCheckboxes.map(
      (cb) => cb.nextElementSibling.textContent
    );
  } else {
    // If no checkboxes are selected, use all names from selectedKlass
    namePool = selectedKlass;
  }

  // Choose a random name
  if (namePool.length > 0) {
    let random = Math.floor(Math.random() * namePool.length);
    document.getElementById("slumpName").textContent = namePool[random];
  } else {
    document.getElementById("slumpName").textContent = "No names available";
  }
}
