import express from "express";
import pkg from "pg"; // Import PostgreSQL client
import cors from "cors";

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection
const db = new Pool({
  user: "postgres",  // Replace with your PostgreSQL username
  host: "localhost",
  database: "postgres",  // Ensure this matches your DBeaver database name
  password: "012649",  // Replace with your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});

// Test database connection
db.connect()
  .then(() => console.log("Connected to PostgreSQL database."))
  .catch((err) => console.error("Database connection error:", err.stack));

// Default route
app.get("/", (req, res) => {
  res.json("Welcome to Social Media API");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  const { username, email, password_hash, profile_picture, bio } = req.body;
  const query = "INSERT INTO users (username, email, password_hash, profile_picture, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id";
  
  try {
    const result = await db.query(query, [username, email, password_hash, profile_picture, bio]);
    res.json({ message: "User created successfully!", userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  const { user_id, title, description, media_url } = req.body;
  const query = "INSERT INTO posts (user_id, title, description, media_url) VALUES ($1, $2, $3, $4) RETURNING id";
  
  try {
    const result = await db.query(query, [user_id, title, description, media_url]);
    res.json({ message: "Post created successfully!", postId: result.rows[0].id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM posts WHERE id = $1";
  
  try {
    await db.query(query, [postId]);
    res.json({ message: "Post deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all comments for a post
app.get("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const query = "SELECT * FROM comments WHERE post_id = $1";
  
  try {
    const result = await db.query(query, [postId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a comment
app.post("/comments", async (req, res) => {
  const { post_id, user_id, comment_text } = req.body;
  const query = "INSERT INTO comments (post_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING id";
  
  try {
    const result = await db.query(query, [post_id, user_id, comment_text]);
    res.json({ message: "Comment added successfully!", commentId: result.rows[0].id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start server
app.listen(8800, () => {
  console.log("Server running on port 8800.");
});
