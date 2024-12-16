// variabler
let currentClass = {
  className: "",
  students: [],
};
let classes02 = getClasses();

function addStudent(student) {
  const studentList = document.getElementById("studentList");

  currentClass.students.push(student);

  // Lägger till i html (Den synliga listan)
  const listItem = document.createElement("li");
  listItem.textContent = student;
  studentList.appendChild(listItem);

  // Tar bort från input fielden efter den är sparad
  document.getElementById("studentName").value = "";
}

// Funktion för add lägga till elev
function addStudents() {
  const studentName = document.getElementById("studentName").value;
  multipleStudent = studentName.split("  ");
  console.log(multipleStudent);

  multipleStudent.forEach((student) => {
    addStudent(student);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const studentNameInput = document.getElementById("studentName");

  // Add event listener for the Enter key
  studentNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const studentName = studentNameInput.value.trim();
      if (studentName) {
        addStudents();
      }
    }
  });
});

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
  classes02 = getClasses();
  populateDropdown();
}

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
  selectedKlass.forEach((name, index) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

    p.textContent = name;
    p.contentEditable = true; // Gör texten redigerbar
    p.classList.add("editable-name");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("defaultDelete");

    // Lägg till eventlistener för att spara ändringar när man klickar utanför
    p.addEventListener("blur", () => {
      const newName = p.textContent.trim();
      if (newName && newName !== name) {
        selectedKlass[index] = newName;
      }
    });

    // Lägg till eventlistener för Enter-tangenten
    p.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        p.blur();
      }
    });

    // Delete functionality (oförändrad)
    deleteBtn.addEventListener("click", () => {
      selectedKlass.splice(index, 1);
      displayNames();
    });

    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(deleteBtn);
    namesList.appendChild(li);
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

function saveEditedClass() {
  const selectedClass = classDropdown.value;
  if (!selectedClass) {
    alert("Välj en klass att spara först.");
    return;
  }

  // Läs in den befintliga JSON-filen
  let classes = {};
  if (fs.existsSync(classesFilePath)) {
    const data = fs.readFileSync(classesFilePath, "utf-8");
    classes = JSON.parse(data);
  }

  // Uppdatera klassen med de redigerade eleverna
  classes[selectedClass] = selectedKlass;

  // Skriv tillbaka den uppdaterade datan till JSON-filen
  fs.writeFileSync(classesFilePath, JSON.stringify(classes, null, 2), "utf-8");

  //alert("Klassen har sparats med de redigerade ändringarna.");

  // Uppdatera dropdown och namnlista för att reflektera ändringarna
  populateDropdown();
  displayNames();
}

function importClass() {
  const fileInput = document.getElementById("avatar");

  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = (event) => {
    const importedData = event.target.result;

    //const fs = require("fs");
    const classesFilePath = "data/classes.json";

    fs.writeFileSync(classesFilePath, importedData, "utf-8"); //RITA

    alert("Class imported and file overwritten successfully!");
  };

  reader.readAsText(file);
}

// Add event listener to handle file import

document.addEventListener("DOMContentLoaded", () => {
  const classDropdown = document.getElementById("classDropdown");
  const namesList = document.getElementById("namesList");
  const inputThing = document.getElementById("avatar");
  classDropdown.addEventListener("change", getNamesFromClass);
  inputThing.addEventListener("change", importClass);

  populateDropdown();
});
