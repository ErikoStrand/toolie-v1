const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const groupsDiv = document.getElementById('groups');
const sortButton = document.getElementById('sortButton');

let names = [];

nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        nameInput.value = '';
    }
});

sortButton.addEventListener('click', () => {
    const groups = sortNamesIntoGroups(names);
    displayGroups(groups);
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sortNamesIntoGroups(names) {
    // Shuffle the names array
    const shuffledNames = shuffleArray(names.slice());
    // Divide shuffled names into two groups
    const group1 = [];
    const group2 = [];
    shuffledNames.forEach((name, index) => {
        if (index % 2 === 0) {
            group1.push(name);
        } else {
            group2.push(name);
        }
    });
    return [group1, group2];
}

function displayGroups(groups) {
    groupsDiv.innerHTML = '';
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.innerHTML = `<h2>Group ${index + 1}</h2><ul>${group.map(name => `<li>${name}</li>`).join('')}</ul>`;
        groupsDiv.appendChild(groupDiv);
    });
}
