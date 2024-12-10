const fs = require("fs"); // Required for file system operations
const path = require("path"); // To manage file paths

const classesFilePath = "data/classes.json";

// variabler
let currentClass = {
  className: "",
  students: [],
};

// Funktion för add lägga till elev
function addStudent() {
  const studentName = document.getElementById("studentName").value.trim();
  const studentList = document.getElementById("studentList");

  currentClass.students.push(studentName);

  // Lägger till i html (Den synliga listan)
  const listItem = document.createElement("li");
  listItem.textContent = studentName;
  studentList.appendChild(listItem);

  // Tar bort från input fielden efter den är sparad
  document.getElementById("studentName").value = "";
}

// För att spara klasser
function saveClass() {
  const className = document.getElementById("className").value.trim();

  currentClass.className = className;

  let classes = {};
  if (fs.existsSync(classesFilePath)) {
    const data = fs.readFileSync(classesFilePath, "utf-8");
    classes = JSON.parse(data);
  }

  // Update the class entry
  classes[className] = currentClass.students;

  fs.writeFileSync(classesFilePath, JSON.stringify(classes, null, 2), "utf-8");

  // Reset the current class and UI fields
  currentClass = { className: "", students: [] };
  document.getElementById("className").value = "";
  document.getElementById("studentList").innerHTML = "";
}

const classes02 = getClasses();

// Populate Dropdown with Classes
function populateDropdown() {
  // Clear and populate dropdown
  classDropdown.innerHTML = '<option value="">--Välj en klass--</option>';
  classes02.forEach((className) => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    classDropdown.appendChild(option);
  });
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
    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

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

    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(deleteBtn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const classDropdown = document.getElementById("classDropdown");
  const namesList = document.getElementById("namesList");
  classDropdown.addEventListener("change", getNamesFromClass);
  populateDropdown();
});
