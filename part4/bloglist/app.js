require("dotenv").config();
require("./utils/db");

// Configure express app and middlewares

const express = require("express");
const app = express();
const cors = require("cors");

// Import routers

const blogsRouter = require("./controllers/blogs");

// Use middlewares

app.use(cors());
app.use(express.json());

// Use routers

app.use("/api/blogs", blogsRouter);

module.exports = app;
