class Book {
  #title;
  #author;
  #pages;
  #wasRead;

  constructor(title, author, pages, wasRead) {
    this.#title = title;
    this.#author = author;
    this.#pages = pages;
    this.#wasRead = wasRead;
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

const controller = (() => {
  const library = new Library();

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

  return { askAddBook, askReadBook, askRemoveBook };
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
