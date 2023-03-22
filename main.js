class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    const div = document.createElement('div');
    div.classList.add('list');
    div.innerHTML = `<div class="row">
      <h3>"${this.title}"</h3> by
      <p>${this.author}</p></div>
      <a href="#" class="btn btn-danger btn-sm remove">Remove</a>
    `;
    document.querySelector('.book-list').appendChild(div);
  }

  static deleteBookList(element) {
    if (element.classList.contains('remove')) {
      element.parentElement.remove();
    }
  }

  static clearFormInputs() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    title.value = '';
    author.value = '';
  }

  static displayBooks() {
    const books = Book.getBooks();
    books.forEach((book) => {
      const newBook = new Book(book.title, book.author);
      newBook.addBook();
    });
  }

  static addBook(book) {
    const books = Book.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static deleteBook(bookIndex) {
    const books = Book.getBooks();
    books.splice(bookIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const home = document.getElementById('home__li');
const add__book = document.getElementById('add__book__li');
const contact = document.getElementById('contact__li');

home.addEventListener('click', () => {
  document.querySelector('.list-container').style.display = 'flex';
  document.querySelector('#add__book').style.display = 'none';
  document.querySelector('#contact').style.display = 'none';
});

add__book.addEventListener('click', () => {
  document.querySelector('#home').style.display = 'none';
  document.querySelector('.new-book-container').style.display = 'flex';
  document.querySelector('#contact').style.display = 'none';
});

contact.addEventListener('click', () => {
  document.querySelector('#home').style.display = 'none';
  document.querySelector('#add__book').style.display = 'none';
  document.querySelector('#contact').style.display = 'flex';
});

// Event: Display Books
document.addEventListener('DOMContentLoaded', Book.displayBooks);

// Event: Add a Book
const formBook = document.querySelector('.new-book-container');
formBook.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Validation
  if (title === '' || author === '') {
    // alert('Please fill in all fields');
    return;
  }

  const newBook = new Book(title, author);
  newBook.addBook();
  Book.addBook(newBook);

  Book.clearFormInputs();
  document.querySelector('#add__book').style.display = 'none';
  document.querySelector('.list-container').style.display = 'flex';
});

// Event: Remove a Book
document.querySelector('.book-list').addEventListener('click', (e) => {
  e.preventDefault();
  const removeButton = e.target.closest('.remove');
  if (removeButton) {
    const listContainer = removeButton.closest('.list-container');
    const bookIndex = Array.from(document.querySelector('.book-list').children).indexOf(listContainer);
    Book.deleteBookList(listContainer);
    Book.deleteBook(bookIndex);
    document.location.reload();
  }
});

// Navigation section here

document.write(new Date().getFullYear());

function ondate() {
  document.querySelector('.date').innerHTML = Date();
}
ondate();

