const mongoose = require('mongoose');

// Define the Comments subdocument schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    description: "Username of the commenter",
  },
  message: {
    type: String,
    required: true,
    description: "The comment text",
  },
  commentedAt: {
    type: Date,
    default: Date.now,
    description: "Automatically records the comment creation time",
  },
});

// Define the Blog Posts schema
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    description: "Serves as the title of the blog post",
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    description: "The main content of the blog post",
  },
  author: {
    type: String,
    required: true,
    description: "Username of the author",
  },
  tags: {
    type: [String],
    description: "Optional field for storing tags or keywords related to the post",
  },
  category: {
    type: String,
    default: "General",
    description: "Indicates the post category",
  },
  likes: {
    type: [String],
    description: "Stores usernames of users who liked the post",
  },
  comments: [commentSchema], // Embed comments as subdocuments
  createdAt: {
    type: Date,
    default: Date.now,
    description: "Automatically records the post creation time",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    description: "Automatically updated on modifications",
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Export the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
