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
}))

export default useBlogStore
