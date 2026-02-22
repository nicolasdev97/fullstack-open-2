const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const helper = require("./test_helper");

// Creates the tests for the functions in list_helper.js

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

describe("most blogs", () => {
  test("returns author with most blogs", () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs);

    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("returns null when list is empty", () => {
    const result = listHelper.mostBlogs([]);

    assert.strictEqual(result, null);
  });
});

describe("most blogs with lodash", () => {
  test("returns author with most blogs with lodash", () => {
    const result = listHelper.mostBlogsWithLodash(helper.listWithManyBlogs);

    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("returns null when list is empty", () => {
    const result = listHelper.mostBlogsWithLodash([]);

    assert.strictEqual(result, null);
  });
});

describe("most likes", () => {
  test("returns author with most total likes", () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs);

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("returns null when list is empty", () => {
    const result = listHelper.mostLikes([]);

    assert.strictEqual(result, null);
  });
});

describe("most likes with lodash", () => {
  test("returns author with most total likes with lodash", () => {
    const result = listHelper.mostLikesWithLodash(helper.listWithManyBlogs);

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("returns null when list is empty", () => {
    const result = listHelper.mostLikesWithLodash([]);

    assert.strictEqual(result, null);
  });
});
