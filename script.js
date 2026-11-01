let myLibrary = [];

const readBooks = document.querySelector(".read-books");

const notReadBooks = document.querySelector(".not-read-books");

const addBookForm = document.getElementById("add-book-form");

const addBookTitle = document.getElementById("title");

const addBookAuthor = document.getElementById("author");

const addBookPages = document.getElementById("pages");

const addBookWasRead = document.getElementById("read");

function generateRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue}, 0.7)`;
}

function addBook(title, author, numberOfPages, wasRead) {
  let book = new Book(title, author, numberOfPages, wasRead);
  myLibrary.push(book);
  displayLibrary();
  console.table(myLibrary);
}

function removeBook(idToRemove) {
  let index = myLibrary.findIndex((book) => book.id === idToRemove);
  myLibrary.splice(index, 1);
  displayLibrary();
  console.table(myLibrary);
}

function Book(title, author, numberOfPages, wasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.wasRead = wasRead;
  this.color = generateRandomRGB();
}

Book.prototype.toggleRead = function () {
  this.wasRead = !this.wasRead;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
    this.wasRead ? "already read" : "not riden yet"
  }`;
};

function displayLibrary() {
  readBooks.innerHTML = "";
  notReadBooks.innerHTML = "";
  for (let book of myLibrary) {
    if (book.wasRead) {
      displayBook(book, readBooks);
    } else {
      displayBook(book, notReadBooks);
    }
  }
}

function displayBook(book, shelf) {
  const newBook = document.createElement("div");
  newBook.style.width = `${Math.round(book.numberOfPages / 2)}px`;
  newBook.style.backgroundColor = book.color;
  newBook.classList.add("book");
  console.log(newBook);
  const removeBookButton = document.createElement("button");
  removeBookButton.classList.add("remove-book-button");
  removeBookButton.addEventListener("click", (event) => {
    removeBook(book.id);
  });
  newBook.appendChild(removeBookButton);
  shelf.appendChild(newBook);
}

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let title = addBookTitle.value;
  let author = addBookAuthor.value;
  let numberOfPages = addBookPages.valueAsNumber;
  let wasRead = addBookWasRead.checked;
  addBook(title, author, numberOfPages, wasRead);
  addBookForm.reset();
});
