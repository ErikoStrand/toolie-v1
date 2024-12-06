// Get all available classes
const classes = getClasses();
let selectedKlass = [];
let groups = [];
let settings = {
  useRandomNames: false,
  randomLeader: false
};


// DOM Elements
const classDropdown = document.getElementById("classDropdown");
const namesList = document.getElementById("namesList");
const addNameBtn = document.getElementById("addNameBtn");
const numGroupsInput = document.getElementById("numGroupsInput");
const sortButton = document.getElementById("sortButton");
const groupsDiv = document.getElementById("groups");
const randomGroupNameCheckbox = document.getElementById("randomGroupName");
const randomLeaderCheckbox = document.getElementById("randomLeader");
const saveGroupsBtn = document.getElementById("saveGroupsBtn");

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


      }
    });

    namesList.appendChild(li);

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

// Sort Names into Groups
function sortNamesIntoGroups() {
  const numGroups = Math.min(parseInt(numGroupsInput.value) || 0, selectedKlass.length);
  if (numGroups <= 1) return; // Ensure there are at least 2 groups

  const shuffledNames = shuffleArray(selectedKlass.slice());
  groups = Array.from({ length: numGroups }, () => []);
  settings.useRandomNames = randomGroupNameCheckbox.checked;
  settings.randomLeader = randomLeaderCheckbox.checked;

  // Distribute names among groups
  shuffledNames.forEach((name, index) => {
    groups[index % numGroups].push(name);
  });

  displayGroups(groups);
}

  
// Display Groups
function displayGroups(groups) {
  groupsDiv.innerHTML = ''; // Clear previous groups 
  const { useRandomNames, randomLeader } = settings;
  const groupNames = useRandomNames ? getRandomGroupNames(groups.length) : [];
  
  groups.forEach((group, index) => { 
    const groupName = useRandomNames ? groupNames[index] : `Group ${index + 1}`;
    const leaderIndex = randomLeader ? Math.floor(Math.random() * group.length) : -1;
    
    const groupDiv = document.createElement('div'); 
    groupDiv.innerHTML = `<h2>${groupName}</h2><ul>${group.map((name, i) => `<li>${name}${i === leaderIndex ? ' <svg xmlns="http://www.w3.org/2000/svg" height="12" width="15" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#B197FC" d="M372.2 52c0 20.9-12.4 39-30.2 47.2L448 192l104.4-20.9c-5.3-7.7-8.4-17.1-8.4-27.1c0-26.5 21.5-48 48-48s48 21.5 48 48c0 26-20.6 47.1-46.4 48L481 442.3c-10.3 23-33.2 37.7-58.4 37.7l-205.2 0c-25.2 0-48-14.8-58.4-37.7L46.4 192C20.6 191.1 0 170 0 144c0-26.5 21.5-48 48-48s48 21.5 48 48c0 10.1-3.1 19.4-8.4 27.1L192 192 298.1 99.1c-17.7-8.3-30-26.3-30-47.1c0-28.7 23.3-52 52-52s52 23.3 52 52z"/></svg>' : ''}</li>`).join('')}</ul>`; 
    groupsDiv.appendChild(groupDiv); });
}

// Get Random Group Names
function getRandomGroupNames(numGroups) {
  const groupNames = [ 
    "Russian Superhackers",  
    "Quartz Crunchers",  "Goons", 
    "Kings GG", "These ones suck", 
    "Sorry, Couldn't come up with anything", 
    "Literally Me"
  ];
  shuffleArray(groupNames);
  return groupNames.slice(0, numGroups);
}

// Shuffle Array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Save Groups as JSON
function saveGroupsAsJSON() {
  if (groups.length === 0) {
    alert("Groups are not yet created. Please sort names into groups first.");
    return;
  }

  const data = { groups, settings };
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; 
  a.download = 'groups.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Event Listeners
classDropdown.addEventListener("change", getNamesFromClass);
addNameBtn.addEventListener("click", addName);
sortButton.addEventListener("click", sortNamesIntoGroups);
saveGroupsBtn.addEventListener("click", saveGroupsAsJSON);

// Initial Setup
populateDropdown();
