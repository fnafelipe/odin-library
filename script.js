function generateRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue}, 0.7)`;
}

class Book {
  #title;
  #author;
  #pages;
  #wasRead;
  #color;

  constructor(title, author, pages, wasRead) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#wasRead = wasRead;
    this.#color = generateRandomRGB();
  }

  get title() {
    return (
      this.#title.charAt(0).toUpperCase() + this.#title.slice(1).toLowerCase()
    );
  }

  get author() {
    return this.#author;
  }

  get pages() {
    return this.#pages;
  }

  get wasRead() {
    return this.#wasRead;
  }

  get color() {
    return this.#color;
  }

  read() {
    if (!this.#wasRead) {
      this.#wasRead = true;
    }
  }
}

class Library {
  #books = [];

  get books() {
    return [...this.#books];
  }

  addBook(bookToAdd) {
    if (!this.#books.some((book) => book.title === bookToAdd.title)) {
      this.#books.push(bookToAdd);
    }
  }

  readBook(bookToRead) {
    bookToRead.read();
  }

  removeBook(bookToRemove) {
    if (this.#books.some((book) => book.title === bookToRemove.title)) {
      this.#books.splice(this.#books.indexOf(bookToRemove), 1);
    }
  }
}

class Interface {
  constructor() {
    this.inputTitle = document.getElementById("title");
    this.inputAuthor = document.getElementById("author");
    this.inputPages = document.getElementById("pages");
    this.inputRead = document.getElementById("read");
    this.addForm = document.getElementById("add-book-form");
    this.readBooks = document.querySelector(".read-books");
    this.notReadBooks = document.querySelector(".not-read-books");
    this.setListeners();
  }

  clearBookDisplay() {
    this.readBooks.innerHTML = "";
    this.notReadBooks.innerHTML = "";
  }

  addReadButton(newBook) {
    const readBookButton = document.createElement("button");
    readBookButton.textContent = "Read";
    readBookButton.classList.add("read-book-button");
    readBookButton.addEventListener("click", () => {
      displayReadBook(newBook);
    });
    newBook.appendChild(readBookButton);
  }

  addRemoveButton(newBook) {
    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove";
    removeBookButton.classList.add("remove-book-button");
    removeBookButton.addEventListener("click", () => {
      displayRemoveBook(newBook);
    });
    newBook.appendChild(removeBookButton);
  }

  createBookDisplay(book) {
    const newBook = document.createElement("div");

    newBook.style.width = `${Math.round(book.pages / 2)}px`;
    console.log(book.color);
    newBook.style.backgroundColor = book.color;
    newBook.classList.add("book");
    console.log(newBook);

    if (!book.wasRead) {
      this.addReadButton(newBook);
    }
    this.addRemoveButton(newBook);

    return newBook;
  }

  displayBooks() {
    let books = controller.getLibrary();
    console.log(controller.getLibrary());
    this.clearBookDisplay();

    for (let book of books) {
      let bookDisplay = this.createBookDisplay(book);
      if (book.wasRead) {
        this.readBooks.appendChild(bookDisplay);
      } else {
        console.log(this.notReadBooks);
        this.notReadBooks.appendChild(bookDisplay);
      }
    }
  }

  displayAddBook(title, author, pages, wasRead) {
    controller.askAddBook(title, author, pages, wasRead);
    console.log(controller.getLibrary());
    this.displayBooks();
  }

  setListeners() {
    this.addForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let title = this.inputTitle.value;
      let author = this.inputAuthor.value;
      let pages = this.inputPages.valueAsNumber;
      let wasRead = this.inputRead.checked;
      this.displayAddBook(title, author, pages, wasRead);
    });
  }
}

const controller = (() => {
  const library = new Library();
  const interface = new Interface();

  const getLibrary = () => {
    return library.books;
  };

  const askAddBook = (title, author, pages, wasRead) => {
    let bookToAdd = createBook(title, author, pages, wasRead);
    library.addBook(bookToAdd);
  };

  const askReadBook = (title) => {
    bookToRead = searchBook(title);
    library.readBook(bookToRead);
  };

  const askRemoveBook = (title) => {
    bookToRemove = searchBook(title);
    library.removeBook(bookToRemove);
  };

  const createBook = (title, author, pages, wasRead) => {
    return new Book(title, author, pages, wasRead);
  };

  const searchBook = (title) => {
    for (let book of library.books) {
      if (book.title === title) {
        return book;
      }
    }
  };

  return { getLibrary, askAddBook, askReadBook, askRemoveBook };
})();

/*
controller.askAddBook("Herobrine a lenda", "Tazercraft", 280, false);
console.table(controller.library);
controller.askReadBook("Herobrine a lenda");
console.table(controller.library);
controller.askRemoveBook("Herobrine a lenda");
console.table(controller.library);

const library1 = new Library();
console.table(library1);

const book1 = new Book("Herobrine a lenda", "Tazercraft", 280, false);

library1.addBook(book1);
console.table(library1);

library1.removeBook(book1);
console.table(library1);

library1.addBook(book1);
console.table(library1);

const book2 = new Book("Herobrine a lenda 2", "Tazercraft", 312, false);
library1.addBook(book2);
console.table(library1);

console.table(book1);
console.table(book2);
book1.read();
book2.read();
console.table(book1);
console.table(book2);

console.log(book.title);

book.title = "Os Incriveis";
console.table(book)

*/
