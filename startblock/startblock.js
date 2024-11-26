const notearea = document.getElementById("notearea");

function expand() {}

function addNewTextarea() {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let input = document.createElement("input");
  let textarea = document.createElement("textarea");
  let del_button = document.createElement("button");
  let exp_button = document.createElement("button");

  li.setAttribute("id", "note");
  input.type = "text";
  input.setAttribute("placeholder", "Anteckning");
  del_button.setAttribute(
    "onclick",
    "this.parentElement.parentElement.remove()"
  );
  del_button.textContent = "Radera anteckning";
  exp_button.setAttribute("onclick", expand());
  exp_button.textContent = "Expandera";

  div.appendChild(input);
  div.appendChild(exp_button);
  div.appendChild(del_button);
  li.appendChild(div);
  li.appendChild(textarea);
  notearea.appendChild(li);
}
