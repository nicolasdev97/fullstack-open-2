const { test } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

// Executes dummy test to ensure the testing framework is working

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});
