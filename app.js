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

// In-memory data storage for courses
let courses = [
  { id: 1, title: 'Course 1', author: 'Abedalraheem Alsaqqa' },
  { id: 2, title: 'Course 2', author: 'Abedalraheem Alsaqqa' },
  { id: 3, title: 'Course 3', author: 'Abedalraheem Alsaqqa' },
  { id: 4, title: 'Quality Assurance Manual', author: 'Abedalraheem Alsaqqa' },
  { id: 5, title: 'Web Development Fundamentals', author: 'Abedalraheem Alsaqqa' },
  { id: 6, title: 'Python Programming Basics', author: 'Abedalraheem Alsaqqa' },
  { id: 7, title: 'Introduction to Data Science', author: 'Abedalraheem Alsaqqa' },
  { id: 8, title: 'JavaScript for Beginners', author: 'Abedalraheem Alsaqqa' },
  { id: 9, title: 'Machine Learning Foundations', author: 'Abedalraheem Alsaqqa' },
  { id: 10, title: 'Software Engineering Principles', author: 'Abedalraheem Alsaqqa' },
  { id: 11, title: 'Graphic Design Fundamentals', author: 'Abedalraheem Alsaqqa' },
  { id: 12, title: 'Data Structures and Algorithms', author: 'Abedalraheem Alsaqqa' },
  { id: 13, title: 'Mobile App Development with React Native', author: 'Abedalraheem Alsaqqa' },
  { id: 14, title: 'Introduction to Artificial Intelligence', author: 'Abedalraheem Alsaqqa' },
  { id: 15, title: 'Ethical Hacking and Cybersecurity', author: 'Abedalraheem Alsaqqa' },
  // Add more sample data as needed
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

// GET all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// GET a specific course by ID
app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    res.status(404).json({ message: 'Course not found' });
  } else {
    res.json(course);
  }
});

// POST a new course
app.post('/api/courses', (req, res) => {
  const newCourse = req.body;
  newCourse.id = courses.length + 1;
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// PUT (update) an existing course by ID
app.put('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const updatedCourse = req.body;
  const index = courses.findIndex((course) => course.id === courseId);

  if (index === -1) {
    res.status(404).json({ message: 'Course not found' });
  } else {
    courses[index] = { ...courses[index], ...updatedCourse };
    res.json(courses[index]);
  }
});

// DELETE a course by ID
app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  courses = courses.filter((course) => course.id !== courseId);
  res.json({ message: 'Course deleted successfully' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
