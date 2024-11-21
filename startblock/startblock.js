const notearea = document.getElementById("notearea");

function addNewTextarea() {
  let li = document.createElement("li");
  let textarea = document.createElement("textarea");
  let button = document.createElement("button");
  li.setAttribute("id", "note");
  button.setAttribute("onclick", "this.parentElement.remove()");
  button.textContent = "Radera anteckning";
  li.appendChild(button);
  li.appendChild(textarea);
  notearea.appendChild(li);
}
