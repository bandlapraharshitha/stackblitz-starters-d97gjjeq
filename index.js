const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./schema'); // Import the schema
const bodyParser = require('body-parser'); // For parsing JSON and form data

const app = express();
const port = 3010;

// Middleware
app.use(express.static('static')); // Serve static files
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Create a new blog post
app.post('/api/blogs', async (req, res) => {
  try {
    const blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all blog posts
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
