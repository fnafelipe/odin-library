let myLibrary = [];

const readBooks = document.querySelector(".read-books");
const notReadBooks = document.querySelector(".not-read-books");

console.log(readBooks, notReadBooks);

function addBook(title, author, numberOfPages, wasRead) {
  let book = new Book(title, author, numberOfPages, wasRead);
  myLibrary.push(book);
  console.table(myLibrary);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
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
}

Book.prototype.toggleRead = function () {
  this.wasRead = !this.wasRead;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
    this.wasRead ? "already read" : "not riden yet"
  }`;
};

function createBookDisplay(book) {
  const newBook = document.createElement("div");
  newBook.style.width = `${Math.round(book.numberOfPages / 5)}px`;
  newBook.style.height = "100%";
  newBook.style.backgroundColor = "red";
  newBook.style.border = "5px solid gold";
  readBooks.appendChild(newBook);
}

addBook("The Hobbit", "J R R", 295, true);
addBook("The Hobbit 2", "J R R", 287, true);
addBook("The Hobbit 3", "J R R", 312, false);

console.log(myLibrary[0].info());
myLibrary[0].toggleRead();
console.log(myLibrary[0].info());

removeBook(0);

let book1 = new Book("The Hobbit", "J R R", 295, true);

createBookDisplay(book1);
