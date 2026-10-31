let myLibrary = [];

function addBook(title, author, numberOfPages, wasRead) {
  let book = new Book(title, author, numberOfPages, wasRead);
  myLibrary.push(book);
  console.table(myLibrary);
}

function Book(title, author, numberOfPages, wasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
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

addBook("The Hobbit", "J R R", 295, true);
addBook("The Hobbit 2", "J R R", 287, true);
addBook("The Hobbit 3", "J R R", 312, false);

console.log(myLibrary[0].info());
myLibrary[0].toggleRead();
console.log(myLibrary[0].info());
