const notearea = document.getElementById("notearea");
const noteNumber = document.getElementById("number");

var number;

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
  //defining elements
  let li = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  let textarea = document.createElement("textarea");
  let del_button = document.createElement("button");
  let exp_button = document.createElement("button");

  //setting atributes to elements
  li.setAttribute("id", "note" /*+ number*/);
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

  number += 1;
}

function resizeTextarea(textarea) {
  textarea.style.width = "auto";
  textarea.style.height = this.scrollheight + "px";
}

function del(button) {
  const li = button.closest("li");
  li.remove();
}

function saveNotes() {}
