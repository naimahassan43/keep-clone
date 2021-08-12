// Write Your Javascript Code Here
class App {
  constructor() {
    // console.log("Code is running");

    //State control

    this.noteArray = JSON.parse(localStorage.getItem("notes")) || [];
    this.title = "";
    this.text = "";

    //html elements
    this.form = document.querySelector("#form");
    this.noteTitle = document.querySelector("#note-title");
    this.noteText = document.querySelector("#note-text");
    this.formButtons = document.querySelector("#form-buttons");
    this.formCloseButton = document.querySelector("#form-close-button");
    this.notes = document.querySelector("#notes");
    this.placeholder = document.querySelector("#placeholder");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.querySelector(".modal-title");
    this.modalText = document.querySelector(".modal-text");

    //METHOD
    this.render();
    this.addEventListeners();
  }
  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
    });
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.noteTitle.value;
      const text = this.noteText.value;
      const hasNote = title || text;
      if (hasNote) {
        this.addNote({ title, text });
      }
    });

    this.formCloseButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.closeForm();
    });
  }
  handleFormClick(event) {
    const isFormClicked = this.form.contains(event.target);
    if (isFormClicked) {
      //expand the form
      this.openForm();
    } else {
      //shrink the form
      this.closeForm();
    }
  }
  openForm() {
    this.form.classList.add(".form-open");
    this.noteTitle.style.display = "block";
    this.formButtons.style.display = "block";
  }
  closeForm() {
    this.form.classList.remove(".form-open");
    this.noteTitle.style.display = "none";
    this.formButtons.style.display = "none";
    this.noteTitle.value = "";
    this.noteText.value = "";
  }
  openModal(event) {
    if (event.target.closest(".note")) {
      console.log("Modal clicked");
      this.modal.classList.toggle("open-modal");
      this.modalText.value = this.text;
      this.modalTitle.value = this.title;
    }
  }
  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };
    // this.noteArray = [...this.noteArray, newNote];
    this.noteArray.push(newNote);
    console.log(this.noteArray);
    this.render();

    this.closeForm();
  }
  render() {
    this.saveNotes();
    this.display();
  }

  selectNote(event) {
    const selectNote = event.target.closest(".note");
    // console.log(selectNote.children);
    const [notetitle, notetext] = selectNote.children;
    this.title = notetitle.textContent;
    this.text = notetext.textContent;
  }

  //Save notes to local storage
  saveNotes() {
    localStorage.setItem("notes", JSON.stringify(this.noteArray));
  }
  display() {
    const hasNote = this.noteArray.length > 0;
    if (hasNote) {
      this.placeholder.style.display = "none";
    } else {
      this.placeholder.style.display = "flex";
    }

    this.notes.innerHTML = this.noteArray
      .map(
        (note) => `
              <div style="background: ${note.color}" class="note">
                  <div class="note-title">${note.title}</div>
                  <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="https://icon.now.sh/palette">
                        <img class="toolbar-delete" src="images/delete.png">
                    </div>
                </div>
              </div>
    
    `
      )
      .join("");
  }
}
new App();
