const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// In-memory data storage for books
let books = [
  // Your existing book data
];

// In-memory data storage for courses
let courses = [
  // Your existing course data
];

// GET all books
// ...

// GET a specific book by ID
// ...

// POST a new book
// ...

// PUT (update) an existing book by ID
// ...

// DELETE a book by ID
// ...

// Proxy endpoint for fetching all courses from the external API
app.get("/api/courses", async (req, res) => {
  try {
    const response = await fetch(
      "https://pacific-bubbly-attic.glitch.me/api/courses"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Proxy endpoint for fetching a specific course by ID from the external API
app.get("/api/courses/:id", async (req, res) => {
  const courseId = parseInt(req.params.id);
  try {
    const response = await fetch(
      `https://pacific-bubbly-attic.glitch.me/api/courses/${courseId}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ message: "Course not found" });
  }
});

// Proxy endpoint for adding a new course to the external API
app.post("/api/courses", async (req, res) => {
  const newCourse = req.body;
  try {
    const response = await fetch(
      "https://pacific-bubbly-attic.glitch.me/api/courses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      }
    );
    const data = await response.json();
    courses.push(data);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Proxy endpoint for updating an existing course by ID in the external API
app.put("/api/courses/:id", async (req, res) => {
  const courseId = parseInt(req.params.id);
  const updatedCourse = req.body;
  try {
    const response = await fetch(
      `https://pacific-bubbly-attic.glitch.me/api/courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourse),
      }
    );
    const data = await response.json();
    const index = courses.findIndex((course) => course.id === courseId);
    if (index === -1) {
      courses.push(data);
    } else {
      courses[index] = data;
    }
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ message: "Course not found" });
  }
});

// Proxy endpoint for deleting a course by ID from the external API
app.delete("/api/courses/:id", async (req, res) => {
  const courseId = parseInt(req.params.id);
  try {
    await fetch(
      `https://pacific-bubbly-attic.glitch.me/api/courses/${courseId}`,
      {
        method: "DELETE",
      }
    );
    courses = courses.filter((course) => course.id !== courseId);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ message: "Course not found" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
