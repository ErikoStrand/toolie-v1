const { remote } = require('electron');
const fs = require('fs');
const path = require('path');

const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const groupsDiv = document.getElementById('groups');
const sortButton = document.getElementById('sortButton');
const numGroupsInput = document.getElementById('numGroups');
const numMembersInput = document.getElementById('numMembers');
const designateLeaderCheckbox = document.getElementById('designateLeader');
const randomGroupNameCheckbox = document.getElementById('randomGroupName');
const saveButton = document.getElementById('saveButton');
const loadInput = document.getElementById('loadInput');
const loadButton = document.getElementById('loadButton');

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
    const numGroups = Math.min(parseInt(numGroupsInput.value), 14);
    const numMembers = Math.min(parseInt(numMembersInput.value), 14);
    const designateLeader = designateLeaderCheckbox.checked;
    const randomGroupName = randomGroupNameCheckbox.checked;
    let groups;
    
    if (numMembers > 0) {
        groups = sortNamesIntoGroupsByMembers(names, numMembers);
    } else {
        groups = sortNamesIntoGroupsByGroups(names, numGroups);
    }
    
    displayGroups(groups, designateLeader, randomGroupName);
});

saveButton.addEventListener('click', () => {
    const filePath = path.join(remote.app.getPath('desktop'), 'names.json');
    fs.writeFile(filePath, JSON.stringify(names), (err) => {
        if (err) {
            alert('Error saving file');
        } else {
            alert('File saved successfully');
        }
    });
});

loadButton.addEventListener('click', () => {
    const file = loadInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                names = JSON.parse(event.target.result);
                alert('File loaded successfully');
            } catch (e) {
                alert('Error loading file');
            }
        };
        reader.readAsText(file);
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function sortNamesIntoGroupsByGroups(names, numGroups) {
    const shuffledNames = shuffleArray(names.slice());
    const groups = Array.from({ length: numGroups }, () => []);
    shuffledNames.forEach((name, index) => {
        groups[index % numGroups].push(name);
    });
    return groups;
}

function sortNamesIntoGroupsByMembers(names, numMembers) {
    const shuffledNames = shuffleArray(names.slice());
    const groups = [];
    for (let i = 0; i < shuffledNames.length; i += numMembers) {
        groups.push(shuffledNames.slice(i, i + numMembers));
    }
    return groups;
}

function getRandomGroupNames(numGroups) {
    const groupNames = ["Eagles", "Tigers", "Sharks", "Lions", "Wolves", "Panthers", "Bears", "Hawks", "Dolphins", "Foxes"];
    shuffleArray(groupNames);
    return groupNames.slice(0, numGroups);
}

function displayGroups(groups, designateLeader, randomGroupName) {
    groupsDiv.innerHTML = '';
    const groupNames = randomGroupName ? getRandomGroupNames(groups.length) : [];
    groups.forEach((group, index) => {
        let leaderIndex = -1;
        if (designateLeader) {
            leaderIndex = Math.floor(Math.random() * group.length);
        }
        const groupName = randomGroupName ? groupNames[index] : `Group ${index + 1}`;
        const groupDiv = document.createElement('div');
        groupDiv.innerHTML = `<h2>${groupName}</h2><ul>${group.map((name, i) => `<li${i === leaderIndex ? ' style="font-weight:bold;"' : ''}>${name}${i === leaderIndex ? ' (Leader)' : ''}</li>`).join('')}</ul>`;
        groupsDiv.appendChild(groupDiv);
    });
}
