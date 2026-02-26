const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const user = {
    username: "existinguser",
    name: "Existing User",
    passwordHash: await require("bcrypt").hash("secret123", 10),
  };

  await new User(user).save();
});

test("valid user is created", async () => {
  const newUser = {
    username: "newuser",
    name: "New User",
    password: "secret123",
  };

  await api.post("/api/users").send(newUser).expect(201);

  const users = await User.find({});
  assert.strictEqual(users.length, 2);
});

test("creation fails with proper statuscode if username already taken", async () => {
  const newUser = {
    username: "existinguser",
    name: "Duplicate",
    password: "secret123",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert(result.body.error.includes("unique"));

  const users = await User.find({});
  assert.strictEqual(users.length, 1);
});

test("creation fails if username too short", async () => {
  const newUser = {
    username: "ab",
    name: "Short Username",
    password: "secret123",
  };

  await api.post("/api/users").send(newUser).expect(400);

  const users = await User.find({});
  assert.strictEqual(users.length, 1);
});

test("creation fails if password too short", async () => {
  const newUser = {
    username: "shortpass",
    name: "Short Pass",
    password: "12",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert(result.body.error.includes("password"));

  const users = await User.find({});
  assert.strictEqual(users.length, 1);
});

after(async () => {
  await mongoose.connection.close();
});
