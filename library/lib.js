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
    remove.classList.add("remove");
    title.textContent = book.title;
    pages.textContent = book.pages;
    author.textContent = book.author;
    remove.textContent = "Remove";
    newBook.appendChild(title);
    newBook.appendChild(pages);
    newBook.appendChild(author);
    newBook.appendChild(remove);
    newBook.classList.add("card");
    remove.dataset.id = book.id;
    container.appendChild(newBook);
  });

  let remove = document.querySelectorAll(".remove");

  remove.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn);
      let book = myLibrary.find((book) => book.id === btn.dataset.id);
      let index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
      displayLibrary(myLibrary);
    });
  });
}

displayLibrary(myLibrary);
// remove.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     myLibrary.forEach(function (book, index) {
//       if (btn.dataset.id === book.id) {
//         myLibrary.splice(index, 1);
//         displayLibrary(myLibrary);
//       }
//     });
//   });
// });

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
