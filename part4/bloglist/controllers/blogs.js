const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

// Define routes and their logic

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post(
  "/",
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id,
      });

      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      const populatedBlog = await savedBlog.populate("user", {
        username: 1,
        name: 1,
      });

      response.status(201).json(populatedBlog);
    } catch (error) {
      next(error);
    }
  },
);

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: "not authorized" });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    returnDocument: "after",
    runValidators: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
