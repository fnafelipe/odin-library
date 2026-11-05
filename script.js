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
}

const book = new Book("Herobrine a lenda", "Tazercraft", 280, true);

console.table(book);
console.log(book.title);

book.title = "Os Incriveis";
console.table(book)
