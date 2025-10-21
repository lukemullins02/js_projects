const container = document.querySelector(".container");
const dialog = document.querySelector("#dialog");
const showButton = document.querySelector("#show-dialog");
const closeButton = document.querySelector("#btn");
const bookInfo = document.querySelector(".book_info");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

const myLibrary = [];

function Book(title, pages, author, read, id) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = read;
  this.id = id;
}

Book.prototype.getStatus = function () {
  if (this.read === "Not Read") {
    this.read = "Read";
  } else {
    this.read = "Not Read";
  }
};

function addBookToLibrary(title, pages, author, read) {
  const book = new Book(title, pages, author, read);
  book.id = crypto.randomUUID();
  myLibrary.push(book);
}

addBookToLibrary("Dune", "630", "Frank Herbert", "Not Read");
addBookToLibrary("LOTR", "1020", "JRR Tolkien", "Not Read");
addBookToLibrary("Crime and Punishment", "407", "Fydor Dostovesky", "Not Read");

function displayLibrary(arr) {
  console.log("hello");
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
    let remove = document.createElement("button");
    let status = document.createElement("button");
    remove.classList.add("remove");
    status.classList.add("status");
    title.textContent = book.title;
    pages.textContent = book.pages;
    author.textContent = book.author;
    remove.textContent = "Remove";
    status.textContent = book.read;
    newBook.appendChild(title);
    newBook.appendChild(pages);
    newBook.appendChild(author);
    newBook.appendChild(remove);
    newBook.appendChild(status);
    newBook.classList.add("card");
    remove.dataset.id = book.id;
    status.dataset.id = book.id;
    container.appendChild(newBook);
  });

  let remove = document.querySelectorAll(".remove");

  remove.forEach((btn) => {
    btn.addEventListener("click", () => {
      let book = myLibrary.find((book) => book.id === btn.dataset.id);
      let index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      displayLibrary(myLibrary);
    });
  });

  let status = document.querySelectorAll(".status");

  status.forEach((btn) => {
    btn.addEventListener("click", () => {
      let book = myLibrary.find((book) => book.id === btn.dataset.id);
      book.getStatus();
      btn.textContent = book.read;
    });
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
    newBook.get("author"),
    newBook.get("read")
  );
  bookInfo.reset();
  displayLibrary(myLibrary);
});
