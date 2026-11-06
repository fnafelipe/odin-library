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
    return this.#title;
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
    this.bookInfo = document.querySelector(".book-info");
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
    newBook.appendChild(readBookButton);
  }

  addRemoveButton(newBook) {
    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove";
    removeBookButton.classList.add("remove-book-button");
    newBook.appendChild(removeBookButton);
  }

  addReadBookListeners(newBook) {
    newBook.addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-book-button")) {
        this.displayRemoveBook(event.target.parentElement.dataset.title);
      }
    });
  }

  addNotReadBookListeners(newBook) {
    newBook.addEventListener("click", (event) => {
      let book = event.target.parentElement;

      if (event.target.classList.contains("remove-book-button")) {
        this.displayRemoveBook(book.dataset.title);
      } else if (event.target.classList.contains("read-book-button")) {
        this.displayReadBook(book.dataset.title);
      }
    });
  }

  createBookDisplay(book) {
    const newBook = document.createElement("div");

    newBook.style.width = `${Math.round(book.pages / 2)}px`;
    console.log(book.color);
    newBook.style.backgroundColor = book.color;
    newBook.classList.add("book");
    newBook.dataset.title = book.title;
    console.log(newBook);

    if (!book.wasRead) {
      this.addReadButton(newBook);
      this.addRemoveButton(newBook);
      this.addNotReadBookListeners(newBook);
    } else {
      this.addRemoveButton(newBook);
      this.addReadBookListeners(newBook);
    }

    newBook.addEventListener("mouseenter", () => {
      this.displayBookInfo(book);
    });
    newBook.addEventListener("mouseleave", () => {
      this.bookInfo.textContent = "";
    });

    return newBook;
  }

  displayBookInfo(book) {
    let title = document.createElement("h2");
    title.textContent = `Title:
  ${book.title}`;
    let author = document.createElement("h2");
    author.textContent = `Author:
  ${book.author}`;
    let pages = document.createElement("h2");
    pages.textContent = `Pages:
  ${book.pages}`;
    this.bookInfo.appendChild(title);
    this.bookInfo.appendChild(author);
    this.bookInfo.appendChild(pages);
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
    this.displayBooks();
  }

  displayReadBook(title) {
    controller.askReadBook(title);
    this.displayBooks();
  }

  displayRemoveBook(title) {
    controller.askRemoveBook(title);
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
    console.log(title);
    bookToRead = searchBook(title);
    console.log(bookToRead);
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
    return false;
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
