// Creates the functions to test the testing framework

const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorCount = {};

  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
  });

  let topAuthor = null;
  let maxBlogs = 0;

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author];
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs,
  };
};

const mostBlogsWithLodash = (blogs) => {
  if (blogs.length === 0) return null;

  const result = _(blogs)
    .countBy("author")
    .map((blogs, author) => ({ author, blogs }))
    .maxBy("blogs");

  return result;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authorLikes = {};

  blogs.forEach((blog) => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes;
  });

  let topAuthor = null;
  let maxLikes = 0;

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author];
      topAuthor = author;
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes,
  };
};

const mostLikesWithLodash = (blogs) => {
  if (blogs.length === 0) return null;

  const result = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, "likes"),
    }))
    .maxBy("likes");

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogsWithLodash,
  mostLikes,
  mostLikesWithLodash,
};
