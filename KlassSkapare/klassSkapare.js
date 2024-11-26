const fs = require("fs"); // Required for file system operations
const path = require("path"); // To manage file paths

const classesFilePath = path.join(__dirname, "classes.json");

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

// För att få alla klasser
function getClasses() {
  if (fs.existsSync(classesFilePath)) {
    // Läsa json fil
    const data = fs.readFileSync(classesFilePath, "utf-8");
    const classes = JSON.parse(data);

    const classDetails = Object.keys(classes);
    console.log(classDetails);
    // Returna json
    return classDetails;
  } else {
    console.warn("Inga klasser hittade!");
    return [];
  }
}

// Förr att få alla namn och klasser...
function getNames(className) {
  if (fs.existsSync(classesFilePath)) {
    const data = fs.readFileSync(classesFilePath, "utf-8");
    const classes = JSON.parse(data);

    const classDetails = classes[className] || [];
    console.log(classDetails);
    // Returna json
    return classDetails; // Return the class details if found
  } else {
    console.warn("No classes found. The file does not exist yet.");
    return null;
  }
}
