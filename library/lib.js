const container = document.querySelector(".container");
const dialog = document.querySelector("#dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#btn");
const bookInfo = document.querySelector(".book_info");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

const myLibrary = [];

function Book(title, pages, author, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.id = id;
}

function addBookToLibrary(title, pages, author) {
  const book = new Book(title, pages, author);
  book.id = crypto.randomUUID();
  myLibrary.push(book);
}

addBookToLibrary("Dune", "630", "Frank Herbert");
addBookToLibrary("LOTR", "1020", "JRR Tolkien");
addBookToLibrary("Crime and Punishment", "407", "Fydor Dostovesky");
console.log(myLibrary);

function displayLibrary(arr) {
  if (container.firstChild) {
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
  }
  arr.forEach(function (book) {
    let newBook = document.createElement("div");
    let title = document.createElement("h1");
    let pages = document.createElement("p");
    let author = document.createElement("p");
    title.textContent = book.title;
    pages.textContent = book.pages;
    author.textContent = book.author;
    newBook.appendChild(title);
    newBook.appendChild(pages);
    newBook.appendChild(author);
    newBook.classList.add("card");
    container.appendChild(newBook);
  });
}

displayLibrary(myLibrary);

bookInfo.addEventListener("submit", (e) => {
  e.preventDefault();
  dialog.close();
  const newBook = new FormData(bookInfo);
  addBookToLibrary(
    newBook.get("title"),
    newBook.get("pages"),
    newBook.get("author")
  );
  bookInfo.reset();
  displayLibrary(myLibrary);
});
