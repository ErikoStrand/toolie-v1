const addsaveNav = document.getElementById("addnsaveNav");

function expand(button) {
  const li = button.closest("li");
  li.setAttribute("id", "noteExpand");
  addsaveNav.style.display = "none";

  const allNotes = document.querySelectorAll("#note");
  const filteredNotes = Array.from(allNotes).filter((note) => note !== li);
  filteredNotes.forEach((note) => {
    note.style.display = "none";
  });

  console.log(filteredNotes);

  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
      <path d="M456 224l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l40 40L442.3 5.7C446 2 450.9 0 456 0s10 2 13.7 5.7l36.7 36.7C510 46 512 50.9 512 56s-2 10-5.7 13.7L433 143l40 40c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8zm0 64c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-40 40 73.4 73.4c3.6 3.6 5.7 8.5 5.7 13.7s-2 10-5.7 13.7l-36.7 36.7C466 510 461.1 512 456 512s-10-2-13.7-5.7L369 433l-40 40c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2l0-144c0-13.3 10.7-24 24-24l144 0zm-256 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-40-40L69.7 506.3C66 510 61.1 512 56 512s-10-2-13.7-5.7L5.7 469.7C2 466 0 461.1 0 456s2-10 5.7-13.7L79 369 39 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8l144 0zM56 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l40-40L5.7 69.7C2 66 0 61.1 0 56s2-10 5.7-13.7L42.3 5.7C46 2 50.9 0 56 0s10 2 13.7 5.7L143 79l40-40c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 144c0 13.3-10.7 24-24 24L56 224z"/>
    </svg>
  `;
  button.onclick = function () {
    shrink(this);
  };
}

function shrink(button) {
  const li = button.closest("li");
  li.setAttribute("id", "note");
  addsaveNav.style.display = "flex";

  const allNotes = document.querySelectorAll("#note");
  allNotes.forEach((note) => {
    note.style.display = "flex";
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
  let textdiv = document.createElement("div");
  let buttondiv = document.createElement("div");
  let title_input = document.createElement("input");
  let time_input = document.createElement("input");
  let textarea = document.createElement("textarea");
  let del_button = document.createElement("button");
  let exp_button = document.createElement("button");

  title_input.style.fontSize = "1rem";
  title_input.style.fontWeight = "bold";
  time_input.style.fontSize = "1rem";
  time_input.style.fontWeight = "bold";
  textarea.style.fontSize = "1rem";

  //allows the font-size on the note to be resized
  li.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && event.ctrlKey) {
      let title_inputFontSize = parseFloat(
        window.getComputedStyle(title_input).fontSize
      );
      let time_inputFontSize = parseFloat(
        window.getComputedStyle(time_input).fontSize
      );
      let textFontSize = parseFloat(window.getComputedStyle(textarea).fontSize);

      title_input.style.fontSize = `${title_inputFontSize + 1}px`;
      time_input.style.fontSize = `${time_inputFontSize + 1}px`;
      textarea.style.fontSize = `${textFontSize + 1}px`;

      console.log("Ctrl + ArrowUp pressed: Font size increased");
      event.preventDefault();
    } else if (event.key === "ArrowDown" && event.ctrlKey) {
      let title_inputFontSize = parseFloat(
        window.getComputedStyle(title_input).fontSize
      );
      let time_inputFontSize = parseFloat(
        window.getComputedStyle(time_input).fontSize
      );
      let textFontSize = parseFloat(window.getComputedStyle(textarea).fontSize);

      title_input.style.fontSize = `${title_inputFontSize - 1}px`;
      time_input.style.fontSize = `${time_inputFontSize + 1}px`;
      textarea.style.fontSize = `${textFontSize - 1}px`;

      console.log("Ctrl + ArrowUp pressed: Font size increased");
      event.preventDefault();
    }
  });

  li.setAttribute("id", "note");
  title_input.type = "text";
  time_input.type = "text";
  title_input.setAttribute("placeholder", "Anteckning");
  time_input.setAttribute("placeholder", "Tid");
  buttondiv.setAttribute("class", "side-flerp");
  textdiv.setAttribute("class", "textdiv");
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

  buttondiv.appendChild(exp_button);
  buttondiv.appendChild(del_button);
  textdiv.appendChild(title_input);
  textdiv.appendChild(time_input);
  textdiv.appendChild(textarea);
  li.appendChild(textdiv);
  li.appendChild(buttondiv);
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

///////////////////////////////////////////////////////////////////////////////
function saveNotes() {
  const notes = document.querySelectorAll("#note");

  //goes through all the elements in the notes object
  const data = Array.from(notes).map((note) => {
    const title_input = note.querySelector("input:first-of-type");
    const time_input = note.querySelector("input:nth-of-type(2)");
    const textarea = note.querySelector("textarea");

    return {
      title: title_input.value.trim(),
      time: time_input.value.trim(),

      textarea: textarea.value.trim(),
    };
  });

  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFileSync("resources/data/notes.json", jsonString, "utf-8");
  exit("startblock");
}

function loadNote() {
  const notearea = document.getElementById("notearea");

  if (fs.existsSync("resources/data/notes.json")) {
    const data = fs.readFileSync("resources/data/notes.json", "utf-8");
    const notes = JSON.parse(data);

    notearea.innerHTML = "";

    //iterates for every note that is in the json file
    notes.forEach((note) => {
      const li = document.createElement("li");
      const textdiv = document.createElement("div");
      const buttondiv = document.createElement("div");
      const title_input = document.createElement("input");
      const time_input = document.createElement("input");
      const textarea = document.createElement("textarea");
      const del_button = document.createElement("button");
      const exp_button = document.createElement("button");

      title_input.style.fontSize = "1rem";
      title_input.style.fontWeight = "bold";
      time_input.style.fontSize = "1rem";
      time_input.style.fontWeight = "bold";
      textarea.style.fontSize = "1rem";

      li.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && event.ctrlKey) {
          let title_inputFontSize = parseFloat(
            window.getComputedStyle(title_input).fontSize
          );
          let time_inputFontSize = parseFloat(
            window.getComputedStyle(time_input).fontSize
          );
          let textFontSize = parseFloat(
            window.getComputedStyle(textarea).fontSize
          );

          title_input.style.fontSize = `${title_inputFontSize + 1}px`;
          time_input.style.fontSize = `${time_inputFontSize + 1}px`;
          textarea.style.fontSize = `${textFontSize + 1}px`;

          console.log("Ctrl + ArrowUp pressed: Font size increased");
          event.preventDefault();
        } else if (event.key === "ArrowDown" && event.ctrlKey) {
          let title_inputFontSize = parseFloat(
            window.getComputedStyle(title_input).fontSize
          );
          let time_inputFontSize = parseFloat(
            window.getComputedStyle(time_input).fontSize
          );
          let textFontSize = parseFloat(
            window.getComputedStyle(textarea).fontSize
          );

          title_input.style.fontSize = `${title_inputFontSize - 1}px`;
          time_input.style.fontSize = `${time_inputFontSize + 1}px`;
          textarea.style.fontSize = `${textFontSize - 1}px`;

          console.log("Ctrl + ArrowUp pressed: Font size increased");
          event.preventDefault();
        }
      });

      li.setAttribute("id", "note");
      title_input.type = "text";
      title_input.setAttribute("placeholder", "Anteckning");
      title_input.value = note.title;
      time_input.type = "text";
      time_input.setAttribute("placeholder", "Tid");
      time_input.value = note.time;
      textarea.value = note.textarea;

      buttondiv.setAttribute("class", "side-flerp");
      textdiv.setAttribute("class", "textdiv");

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

      buttondiv.appendChild(exp_button);
      buttondiv.appendChild(del_button);
      textdiv.appendChild(title_input);
      textdiv.appendChild(time_input);
      textdiv.appendChild(textarea);
      li.appendChild(textdiv);
      li.appendChild(buttondiv);
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
