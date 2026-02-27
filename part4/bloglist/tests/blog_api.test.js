const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("../models/blog");

const User = require("../models/user");
const bcrypt = require("bcrypt");

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

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    name: "Superuser",
    passwordHash,
  });

  const savedUser = await user.save();

  const loginResponse = await api.post("/api/login").send({
    username: "root",
    password: "sekret",
  });

  token = loginResponse.body.token;

  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: savedUser._id }),
  );

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201);

  const blogsAtEnd = await Blog.find({});

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);
});

test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "No likes blog",
    author: "Nicolas",
    url: "http://test.com",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
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

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Missing URL",
    author: "Nicolas",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await Blog.find({});

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
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

test("adding a blog fails with status 401 if token is not provided", async () => {
  const newBlog = {
    title: "No token blog",
    author: "Nicolas",
    url: "http://fail.com",
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);
});

after(async () => {
  await mongoose.connection.close();
});
