const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "Author A",
    url: "url1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Author B",
    url: "url2",
    likes: 3,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blog posts have id property defined", async () => {
  const response = await api.get("/api/blogs");

  const blog = response.body[0];

  assert(blog.id !== undefined);
  assert.strictEqual(blog._id, undefined);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Async/Await testing",
    author: "Nicolas",
    url: "http://test.com",
    likes: 10,
  };

  const blogsAtStart = await Blog.find({});

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await Blog.find({});

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes("Async/Await testing"));
});

test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "No likes blog",
    author: "Nicolas",
    url: "http://test.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Nicolas",
    url: "http://test.com",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Missing URL",
    author: "Nicolas",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await Blog.find({});

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(!titles.includes(blogToDelete.title));
});

test("a blog likes can be updated", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    ...blogToUpdate.toJSON(),
    likes: blogToUpdate.likes + 10,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);
});

after(async () => {
  await mongoose.connection.close();
});
