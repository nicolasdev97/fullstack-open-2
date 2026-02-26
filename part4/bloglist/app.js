require("dotenv").config();
require("./utils/db");

// Configure express app and middlewares

const express = require("express");
const app = express();
const cors = require("cors");

// Import routers

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

// Use middlewares

app.use(cors());
app.use(express.json());

// Use routers

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
