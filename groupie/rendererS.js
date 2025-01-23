const classes = getClasses(); // Get the list of classes
let selectedKlass = []; // Array to store selected class names
let groups = []; // Array to store the groups
let settings = {
  useRandomNames: false, // Flag for using random group names
  randomLeader: false, // Flag for random group leader selection
};

// Get DOM elements
const classDropdown = document.getElementById("classDropdown");
const namesList = document.getElementById("namesList");
const addNameBtn = document.getElementById("addNameBtn");
const numGroupsInput = document.getElementById("numGroupsInput");
const sortButton = document.getElementById("sortButton");
const groupsDiv = document.getElementById("groups");
const randomGroupNameCheckbox = document.getElementById("randomGroupName");
const randomLeaderCheckbox = document.getElementById("randomLeader");
const saveGroupsBtn = document.getElementById("saveGroupsBtn");
const fileInput = document.getElementById("fileInput");

function populateDropdown() {
  classes.forEach((classKey) => {
    const option = document.createElement("option");
    option.value = classKey;
    option.textContent = classKey;
    classDropdown.appendChild(option);
  });

  // Automatically select the first class and load its names
  if (classes.length > 0) {
    classDropdown.value = classes[0];
    getNamesFromClass();
  }
}

function getNamesFromClass() {
  const selectedClass = classDropdown.value;
  namesList.innerHTML = "";
  selectedKlass = getNames(selectedClass); // Get names for the selected class
  displayNames();
}

function displayNames() {
  namesList.innerHTML = "";
  selectedKlass.forEach((name) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");

    p.textContent = name;
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("defaultDelete");

    // Add event listener to delete button
    deleteBtn.addEventListener("click", () => {
      const index = selectedKlass.indexOf(name);
      if (index > -1) {
        selectedKlass.splice(index, 1);
        li.remove();
      }
    });

    namesList.appendChild(li);
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

function sortNamesIntoGroups() {
  const numGroups = Math.min(
    parseInt(numGroupsInput.value) || 0,
    selectedKlass.length
  );
  if (numGroups <= 1) return;

  const shuffledNames = shuffleArray(selectedKlass.slice());
  groups = Array.from({ length: numGroups }, () => []);
  settings.useRandomNames = randomGroupNameCheckbox.checked;
  settings.randomLeader = randomLeaderCheckbox.checked;

  shuffledNames.forEach((name, index) => {
    groups[index % numGroups].push(name);
  });

  const groupNames = settings.useRandomNames
    ? getRandomGroupNames(groups.length)
    : groups.map((_, index) => `Grupp ${index + 1}`);
  const leaders = settings.randomLeader
    ? groups.map((group) => Math.floor(Math.random() * group.length))
    : groups.map(() => -1);

  // Store group names and leaders globally to use them when saving
  window.groupNames = groupNames;
  window.leaders = leaders;

  displayGroups(groups, groupNames, leaders);
}

function displayGroups(groups, groupNames = [], leaders = []) {
  groupsDiv.innerHTML = "";
  const { randomLeader } = settings;

  if (groupNames.length === 0) {
    groupNames = groups.map((_, index) => `Grupp ${index + 1}`);
  }

  groups.forEach((group, index) => {
    const groupName = groupNames[index] || `Grupp ${index + 1}`;
    const leaderIndex = leaders[index];

    const groupDiv = document.createElement("div");
    groupDiv.innerHTML = `<h3>${groupName}</h3><ul>${group
      .map(
        (name, i) =>
          `<li>${name}${
            i === leaderIndex
              ? ' <svg xmlns="http://www.w3.org/2000/svg" height="12" width="15" viewBox="0 0 640 512"><path fill="#B197FC" d="M372.2 52c0 20.9-12.4 39-30.2 47.2L448 192l104.4-20.9c-5.3-7.7-8.4-17.1-8.4-27.1c0-26.5 21.5-48 48-48s48 21.5 48 48c0 26-20.6 47.1-46.4 48L481 442.3c-10.3 23-33.2 37.7-58.4 37.7l-205.2 0c-25.2 0-48-14.8-58.4-37.7L46.4 192C20.6 191.1 0 170 0 144c0-26.5 21.5-48 48-48s48 21.5 48 48c0 10.1-3.1 19.4-8.4 27.1L192 192 298.1 99.1c-17.7-8.3-30-26.3-30-47.1c0-28.7 23.3-52 52-52s52 23.3 52 52z"/></svg>'
              : ""
          }</li>`
      )
      .join("")}</ul>`;
    groupsDiv.appendChild(groupDiv);
  });
}

function getRandomGroupNames(numGroups) {
  const initialAdjectives = [
    "The Agile",
    "The Busy",
    "The Critical",
    "The Dopey",
    "The Dutiful",
    "The Exotic",
    "The French",
    "The Gentle",
    "The Greedy",
    "The Hilarious",
    "The Harmless",
    "The Jovial",
    "The Jumpy",
    "The Kooky",
    "The Keen",
    "The Lucky",
    "The Loud",
    "The Meek",
    "The Majestic",
    "The Naughty",
    "The Nimble",
    "The Phony",
    "The Powerful",
    "The Radiant",
    "The Silly",
    "The Trusty",
    "The Zany",
    "The Wonder",
  ];

  const initialNouns = [
    "Heroes",
    "Villains",
    "Sloths",
    "Ones",
    "Drivers",
    "Explorers",
    "Goons",
    "Axolotls",
    "Capybaras",
    "Geese",
    "Gorillas",
    "Clerks",
    "Jokers",
    "Imposters",
    "Tourists",
    "Team",
  ];

  let adjectives = initialAdjectives.slice();
  let nouns = initialNouns.slice();
  const combinedNames = [];

  for (let i = 0; i < numGroups; i++) {
    if (adjectives.length === 0) adjectives = initialAdjectives.slice();
    if (nouns.length === 0) nouns = initialNouns.slice();

    const adjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);

    const adjective = adjectives.splice(adjectiveIndex, 1)[0]; // Remove and get the adjective
    const noun = nouns.splice(nounIndex, 1)[0]; // Remove and get the noun

    combinedNames.push(`${adjective} ${noun}`);
  }

  return combinedNames;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function saveGroupsAsJSON() {
  if (groups.length === 0) {
    alert("Groups are not yet created. Please sort names into groups first.");
    return;
  }

  // Use globally stored group names and leaders
  const groupNames =
    window.groupNames || groups.map((_, index) => `Grupp ${index + 1}`);
  const leaders = window.leaders || groups.map(() => -1);

  const data = { groups, settings, groupNames, leaders };
  const json = JSON.stringify(data, null, 2); // Convert to JSON
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "groups.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("loadGroups").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener("change", loadGroups);

function loadGroups() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      groups = data.groups || [];
      settings = data.settings || {};
      const groupNames =
        data.groupNames || groups.map((_, index) => `Grupp ${index + 1}`);
      const leaders = data.leaders || groups.map(() => -1);

      // Store group names and leaders globally
      window.groupNames = groupNames;
      window.leaders = leaders;

      displayGroups(groups, groupNames, leaders);
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  };
  reader.readAsText(file);
}

// Add event listeners to buttons and dropdown
classDropdown.addEventListener("change", getNamesFromClass);
addNameBtn.addEventListener("click", addName);
sortButton.addEventListener("click", sortNamesIntoGroups);
saveGroupsBtn.addEventListener("click", saveGroupsAsJSON);
populateDropdown(); // Initialize the dropdown with class options
