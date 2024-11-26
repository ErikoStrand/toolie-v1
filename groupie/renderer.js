const numGroupsOption = document.getElementById('numGroupsOption');
const numMembersOption = document.getElementById('numMembersOption');
const numGroupsInput = document.getElementById('numGroupsInput');
const numMembersInput = document.getElementById('numMembersInput');
const sortButton = document.getElementById('sortButton');
const groupsDiv = document.getElementById('groups');
const designateLeaderCheckbox = document.getElementById('designateLeader');
const randomGroupNameCheckbox = document.getElementById('randomGroupName');

let names = [];

numGroupsOption.addEventListener('change', () => {
    numGroupsInput.classList.remove('hidden');
    numMembersInput.classList.add('hidden');
});

numMembersOption.addEventListener('change', () => {
    numGroupsInput.classList.add('hidden');
    numMembersInput.classList.remove('hidden');
});

addNameButton.addEventListener('click', () => { 
    const name = nameInput.value.trim(); 
    if (name) { names.push(name); 
        nameInput.value = ''; updateNameList(); } });


sortButton.addEventListener('click', () => {
    const numGroups = Math.min(parseInt(numGroupsInput.value) || 0, 14);
    const numMembers = Math.min(parseInt(numMembersInput.value) || 0, 14);
    const designateLeader = designateLeaderCheckbox.checked;
    const randomGroupName = randomGroupNameCheckbox.checked;
    let groups;
    
    if (numMembersOption.checked) {
        groups = sortNamesIntoGroupsByMembers(names, numMembers);
    } else {
        groups = sortNamesIntoGroupsByGroups(names, numGroups);
    }
    
    displayGroups(groups, designateLeader, randomGroupName);
});

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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomGroupNames(numGroups) {
    const groupNames = ["The Rizzlers", "Citizens of Ohio", "Fanum Taxers", "Russian Superhackers", "Tech Overlords of New Delhi", "Quartz Crunchers", "Fat (lol)", "Goons", "Berzerkers", "Kings GG", "These ones suck", "Sorry, Couldn't come up with anything", "Crack Consumers", "Literally Me"];
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
