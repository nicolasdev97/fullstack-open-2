const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

// Creates the tests for the functions in list_helper.js.

test("dummy returns one", () => {
  const blogs = helper.emptyList;

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(helper.emptyList);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(helper.listWithManyBlogs);
    assert.strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("returns blog with most likes", () => {
    const result = listHelper.favoriteBlog(helper.listWithManyBlogs);

    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("returns null when list is empty", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });
});
