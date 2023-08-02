const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory data storage for books
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a specific book by ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    res.json(book);
  }
});

// POST a new book
app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update) an existing book by ID
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books[index] = { ...books[index], ...updatedBook };
    res.json(books[index]);
  }
});

// DELETE a book by ID
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter((book) => book.id !== bookId);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

