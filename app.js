// Write Your Javascript Code Here
class App {
  constructor() {
    // console.log("Code is running");

    //State control

    // this.noteArray = JSON.parse(localStorage.getItem("notes")) || [];
    this.noteArray = [];
    this.title = "";
    this.text = "";
    this.id = "";

    //html elements
    this.form = document.querySelector("#form");
    this.noteTitle = document.querySelector("#note-title");
    this.noteText = document.querySelector("#note-text");
    this.formButtons = document.querySelector("#form-buttons");
    this.formCloseButton = document.querySelector("#form-close-button");
    this.notes = document.querySelector("#notes");
    this.placeholder = document.querySelector("#placeholder");
    this.colorToolTip = document.querySelector("#color-tooltip");
    this.modal = document.querySelector(".modal");
    this.modalTitle = document.querySelector(".modal-title");
    this.modalText = document.querySelector(".modal-text");
    this.modalCloseBtn = document.querySelector(".modal-close-button");

    //METHOD
    this.render();
    this.addEventListeners();
  }
  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
      // this.deleteNote(event);
    });

    document.body.addEventListener("mouseover", (event) => {
      this.openTooltip(event);
    });

    // document.body.addEventListener("mouseout", (event) => {
    //   this.closeTooltip(event);
    // });
    this.colorToolTip.addEventListener("click", (event) => {
      const color = event.target.dataset.color;
      if (color) {
        this.editNoteColor(color);
      }
      this.colorToolTip.style.display = "none";
    });
    this.colorToolTip.addEventListener("mouseover", function () {
      this.style.display = "flex";
    });
    this.colorToolTip.addEventListener("mouseout", function () {
      this.style.display = "none";
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

    this.modalCloseBtn.addEventListener("click", (event) => {
      this.closeModal(event);
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

  closeModal(event) {
    this.editNote();
    this.modal.classList.toggle("open-modal");
  }

  openTooltip(event) {
    if (!event.target.matches(".toolbar-color")) return;
    this.id = event.target.dataset.id;
    const coOrdinate = event.target.getBoundingClientRect();
    const horizontal = coOrdinate.left + window.scrollX;
    const vertical = window.scrollY - 15;
    this.colorToolTip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.colorToolTip.style.display = "flex";
  }

  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: "white",
      id:
        this.noteArray.length > 0
          ? this.noteArray[this.noteArray.length - 1].id + 1
          : 1,
    };
    // this.noteArray = [...this.noteArray, newNote];
    this.noteArray.push(newNote);
    console.log(this.noteArray);
    this.render();

    this.closeForm();
  }

  editNote() {
    const title = this.modalTitle.value;
    const text = this.modalText.value;
    this.noteArray.map((note) => {
      if (note.id == Number(this.id)) {
        note.title = title;
        note.text = text;
      }
    });

    this.render();
  }

  editNoteColor(color) {
    this.noteArray.map((note) => {
      if (note.id == Number(this.id)) {
        note.color = color;
      }
    });
    this.render();
  }
  selectNote(event) {
    const selectNote = event.target.closest(".note");

    if (!selectNote) return;
    // console.dir(selectNote);
    const [notetitle, notetext] = selectNote.children;
    this.title = notetitle.textContent;
    this.text = notetext.textContent;
    this.id = selectNote.dataset.id;
    console.log(this.id);
  }

  // deleteNote(event) {
  //   event.stopPropagation();
  //   if (!event.target.matches(".toolbar-delete")) return;
  //   const id = event.target.dataset.id;
  //   this.noteArray = this.noteArray.filter((note) => note.id !== Number(id));

  //   this.render();
  // }

  render() {
    // this.saveNotes();
    this.display();
  }

  //Save notes to local storage
  // saveNotes() {
  //   localStorage.setItem("notes", JSON.stringify(this.noteArray));
  // }
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
              <div style="background: ${note.color}" class="note" data-id="${note.id}">
                  <div class="note-title">${note.title}</div>
                  <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="https://icon.now.sh/palette" data-id="${note.id}">
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
