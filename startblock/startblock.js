const fs = require("fs");

function expand(button) {
  const li = button.closest("li");
  li.setAttribute("id", "noteExpand");

  // Change button to "Collapse"
  button.textContent = "Minska";
  button.onclick = function () {
    collapse(this);
  };
}

function collapse(button) {
  const li = button.closest("li"); // Get the closest 'li' element
  li.setAttribute("id", "note");

  // Change button back to "Expand"
  button.textContent = "Expandera";
  button.onclick = function () {
    expand(this);
  };
}

function addNewTextarea() {
  const notearea = document.getElementById("notearea");

  //defining elements
  let li = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  let textarea = document.createElement("textarea");
  let del_button = document.createElement("button");
  let exp_button = document.createElement("button");

  //setting atributes to elements
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

  //putting all the elements together
  div.appendChild(input);
  div.appendChild(exp_button);
  div.appendChild(del_button);
  li.appendChild(div);
  li.appendChild(textarea);
  notearea.appendChild(li);
}

//functions for the buttonsd controlling it's specific note
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
  console.log(data);
}
