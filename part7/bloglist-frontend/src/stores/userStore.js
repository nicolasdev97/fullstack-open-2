import { create } from "zustand"
import loginService from "../services/login"
import blogService from "../services/blogs"
import userService from "../services/users"

const useUserStore = create((set) => ({
  user: null,
  users: [],

  setUser: (user) => set({ user }),

  fetchUsers: async () => {
    const users = await userService.getAll()
    set({ users })
  },

  login: async (credentials) => {
    const user = await loginService.login(credentials)

    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

    blogService.setToken(user.token)

    set({ user })
  },

  logout: () => {
    window.localStorage.removeItem("loggedBlogappUser")
    set({ user: null })
  },

  loadUser: () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      set({ user })
    }
  },
}))

export default useUserStore
