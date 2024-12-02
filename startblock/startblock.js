const fs = require("fs");

function expand(button) {
  const li = button.closest("li");
  li.setAttribute("id", "noteExpand");

  button.textContent = "Minska";
  button.onclick = function () {
    collapse(this);
  };
}
function collapse(button) {
  const li = button.closest("li");
  li.setAttribute("id", "note");

  button.textContent = "Expandera";
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
  del_button.textContent = "Radera anteckning";
  exp_button.textContent = "Expandera";
  exp_button.onclick = function () {
    expand(this);
  };

  div.appendChild(input);
  div.appendChild(exp_button);
  div.appendChild(del_button);
  li.appendChild(div);
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
  fs.writeFileSync("notes.json", jsonString, "utf-8");
}

function loadNote() {
  const notearea = document.getElementById("notearea");

  //checks if the file notes.json exists, if it does it will write down the contents of the json file in the notearea
  if (fs.existsSync("notes.json")) {
    const data = fs.readFileSync("notes.json", "utf-8");
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

      del_button.textContent = "Radera anteckning";
      del_button.onclick = function () {
        del(this);
      };

      exp_button.textContent = "Expandera";
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
