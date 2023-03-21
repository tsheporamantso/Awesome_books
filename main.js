/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
// Array Constructor
const booksObject = {};

// Storage Functions
const getBooks = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  return books;
};

const addBookStr = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

const deleteBookStr = (bookIndex) => {
  const books = getBooks();
  books.splice(bookIndex, 1);
  localStorage.setItem('books', JSON.stringify(books));
};

// Array UI
const list = document.querySelector('.book-list');

const addBook = (book) => {
  const div = document.createElement('div');
  div.classList.add('list-container');
  div.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <a href="#" class="btn btn-danger btn-sm remove">Remove</a>


  `;
  list.appendChild(div);
};

const title = document.querySelector('#title');
const author = document.querySelector('#author');

const clearFormInputs = () => {
  title.value = '';
  author.value = '';
};

const deleteBookList = (element) => {
  if (element.classList.contains('remove')) {
    element.parentElement.remove();
  }
};

// Events: Display Books
const books = getBooks();
books.forEach((book) => addBook(book));

// Event: add a book
const formBook = document.querySelector('.new-book-container');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get input values
  const titleValue = title.value;
  const authorValue = author.value;

  // Validation
  if (titleValue === '' || authorValue === '') {
    alert('Please fill in all fields');
    return;
  }

  // Create book object and add it to the UI and storage
  const book = {
    title: titleValue,
    author: authorValue,
  };
  addBook(book);
  addBookStr(book);

  // Clear form inputs
  clearFormInputs();
});

// Event: remove a book
list.addEventListener('click', (e) => {
  e.preventDefault();
  const removeButton = e.target.closest('.remove');
  if (removeButton) {
    const listContainer = removeButton.closest('.list-container');
    const bookIndex = Array.from(list.children).indexOf(listContainer);
    deleteBookList(listContainer);
    deleteBookStr(bookIndex);
    document.location.reload();
  }
});
