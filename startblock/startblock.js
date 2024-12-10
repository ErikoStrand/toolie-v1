const { ipcRenderer } = require("electron");
const fs = require("fs");
const addButton = document.getElementById("add");
const saveButton = document.getElementById("save");

function expand(button) {
  const li = button.closest("li");
  li.setAttribute("id", "noteExpand");
  addButton.style.display = "none";
  saveButton.style.display = "none";

  const allNotes = document.querySelectorAll("#note");
  const filteredNotes = Array.from(allNotes).filter((note) => note !== li);
  filteredNotes.forEach((note) => {
    note.style.visibility = "hidden";
  });

  console.log(filteredNotes);

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M456 224l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l40 40L442.3 5.7C446 2 450.9 0 456 0s10 2 13.7 5.7l36.7 36.7C510 46 512 50.9 512 56s-2 10-5.7 13.7L433 143l40 40c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8zm0 64c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-40 40 73.4 73.4c3.6 3.6 5.7 8.5 5.7 13.7s-2 10-5.7 13.7l-36.7 36.7C466 510 461.1 512 456 512s-10-2-13.7-5.7L369 433l-40 40c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2l0-144c0-13.3 10.7-24 24-24l144 0zm-256 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-40-40L69.7 506.3C66 510 61.1 512 56 512s-10-2-13.7-5.7L5.7 469.7C2 466 0 461.1 0 456s2-10 5.7-13.7L79 369 39 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8l144 0zM56 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l40-40L5.7 69.7C2 66 0 61.1 0 56s2-10 5.7-13.7L42.3 5.7C46 2 50.9 0 56 0s10 2 13.7 5.7L143 79l40-40c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 144c0 13.3-10.7 24-24 24L56 224z"/>
    </svg>
  `;
  button.onclick = function () {
    collapse(this);
  };
}
function collapse(button) {
  const li = button.closest("li");
  li.setAttribute("id", "note");
  addButton.style.display = "initial";
  saveButton.style.display = "initial";

  const allNotes = document.querySelectorAll("#note");
  allNotes.forEach((note) => {
    note.style.visibility = "visible";
  });

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M200 32L56 32C42.7 32 32 42.7 32 56l0 144c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312l0 144c0 13.3 10.7 24 24 24l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l144 0c13.3 0 24-10.7 24-24l0-144c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-144c0-13.3-10.7-24-24-24L312 32c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"/>
    </svg>
  `;
  button.onclick = function () {
    expand(this);
  };
}

function addNewNote() {
  const notearea = document.getElementById("notearea");

  let li = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  let textarea = document.createElement("textarea");
  let del_button = document.createElement("button");
  let exp_button = document.createElement("button");

  li.setAttribute("id", "note");
  input.type = "text";
  input.setAttribute("placeholder", "Anteckning");
  del_button.onclick = function () {
    del(this);
  };
  del_button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
    </svg>
  `;
  exp_button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M200 32L56 32C42.7 32 32 42.7 32 56l0 144c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312l0 144c0 13.3 10.7 24 24 24l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l144 0c13.3 0 24-10.7 24-24l0-144c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-144c0-13.3-10.7-24-24-24L312 32c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"/>
    </svg>
  `;
  exp_button.onclick = function () {
    expand(this);
  };

  div.appendChild(input);
  div.appendChild(exp_button);
  div.appendChild(del_button);
  li.appendChild(div);
  selectTextareaLine(textarea, 3);
  li.appendChild(textarea);
  notearea.appendChild(li);
}

function resizeTextarea(textarea) {
  textarea.style.width = "auto";
  textarea.style.height = this.scrollheight + "px";
}
function del(button) {
  const li = button.closest("li");
  li.remove();
}

function saveNotes() {
  const notes = document.querySelectorAll("#note");

  //goes through all the elements in the notes object
  const data = Array.from(notes).map((note) => {
    const input = note.querySelector("input");
    const textarea = note.querySelector("textarea");

    return {
      title: input.value.trim(),
      textarea: textarea.value.trim(),
    };
  });

  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync("data/notes.json", jsonString, "utf-8");
}

function loadNote() {
  const notearea = document.getElementById("notearea");

  if (fs.existsSync("data/notes.json")) {
    const data = fs.readFileSync("data/notes.json", "utf-8");
    const notes = JSON.parse(data);

    notearea.innerHTML = "";

    //iterates for every note that is in the json file
    notes.forEach((note) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const input = document.createElement("input");
      const textarea = document.createElement("textarea");
      const del_button = document.createElement("button");
      const exp_button = document.createElement("button");

      //setting the attributes to the elements and their respective values taken from the json file
      li.setAttribute("id", "note");
      input.type = "text";
      input.setAttribute("placeholder", "Anteckning");
      input.value = note.title;
      textarea.value = note.textarea;
      textarea.setAttribute("spellcheck", "false");

      del_button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/>
    </svg>
  `;
      del_button.onclick = function () {
        del(this);
      };

      exp_button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M200 32L56 32C42.7 32 32 42.7 32 56l0 144c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312l0 144c0 13.3 10.7 24 24 24l144 0c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l144 0c13.3 0 24-10.7 24-24l0-144c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2l0-144c0-13.3-10.7-24-24-24L312 32c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z"/>
    </svg>
  `;
      exp_button.onclick = function () {
        expand(this);
      };

      div.appendChild(input);
      div.appendChild(exp_button);
      div.appendChild(del_button);
      li.appendChild(div);
      li.appendChild(textarea);
      notearea.appendChild(li);
    });
  } else {
    console.error("notes.json file not found");
  }
}

//loads in the notes when the html file has been loaded in/read through
document.addEventListener("DOMContentLoaded", () => {
  loadNote();
  console.log("notes.json loaded");
});

function exit() {
  ipcRenderer.send("close-window");
}

function test() {
  console.log("a test for testing");
}

function selectTextareaLine(tarea, lineNum) {
  lineNum--; // array starts at 0
  var lines = tarea.value.split("\n");

  // calculate start/end
  var startPos = 0,
    endPos = tarea.value.length;
  for (var x = 0; x < lines.length; x++) {
    if (x == lineNum) {
      break;
    }
    startPos += lines[x].length + 1;
  }

  var endPos = lines[lineNum].length + startPos;

  // do selection
  // Chrome / Firefox

  if (typeof tarea.selectionStart != "undefined") {
    tarea.focus();
    tarea.selectionStart = startPos;
    tarea.selectionEnd = endPos;
    return true;
  }

  // IE
  if (document.selection && document.selection.createRange) {
    tarea.focus();
    tarea.select();
    var range = document.selection.createRange();
    range.collapse(true);
    range.moveEnd("character", endPos);
    range.moveStart("character", startPos);
    range.select();
    return true;
  }

  return false;
}
