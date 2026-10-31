let myLibrary = [];

function addNewBook(title, author, numberOfPages, wasRead) {
  let book = new Book(title, author, numberOfPages, wasRead);
  myLibrary.push(book);
  console.table(myLibrary)
}

function Book(title, author, numberOfPages, wasRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.wasRead = wasRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${
      wasRead ? "already read" : "not riden yet"
    }`;
  };
}

addNewBook("The Hobbit", "J R R", 295, true)
addNewBook("The Hobbit 2", "J R R", 287, true)
addNewBook("The Hobbit 3", "J R R", 312, false)
