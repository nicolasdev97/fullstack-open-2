import { create } from "zustand"
import blogService from "../services/blogs"

const useBlogStore = create((set) => ({
  blogs: [],

  setBlogs: (blogs) => set({ blogs }),

  fetchBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (newBlog) => {
    const createdBlog = await blogService.create(newBlog)

    set((state) => ({
      blogs: state.blogs.concat(createdBlog),
    }))
  },
  likeBlog: async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    set((state) => ({
      blogs: state.blogs.map((b) =>
        b.id === blog.id ? { ...returnedBlog, user: blog.user } : b
      ),
    }))
  },

  deleteBlog: async (id) => {
    await blogService.remove(id)

    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    }))
  },
}))

export default useBlogStore
