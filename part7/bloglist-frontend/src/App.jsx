import { useEffect, useRef } from "react"

import LoginForm from "./components/LoginForm"
import BlogsView from "./components/BlogsView"
import AddBlogForm from "./components/AddBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { useNotification } from "./contexts/NotificationContext"
import { useQuery } from "@tanstack/react-query"
import blogService from "./services/blogs"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import useNotificationStore from "./stores/notificationStore"

import loginService from "./services/login"

import useBlogStore from "./stores/blogStore"

import useUserStore from "./stores/userStore"
import { useUser } from "./contexts/UserContext"

const App = () => {
  const createBlog = useBlogStore((state) => state.createBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  const loadUser = useUserStore((state) => state.loadUser)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  const [user, userDispatch] = useUser()

  const [notification, dispatch] = useNotification()

  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  // Show notification

  const showNotification = (message, type = "success", time = 5) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message, type },
    })

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, time * 1000)
  }

  // Check if user is logged in

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)

      userDispatch({
        type: "SET_USER",
        payload: user,
      })
    }
  }, [])

  // Login

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)

      userDispatch({
        type: "SET_USER",
        payload: user,
      })

      showNotification(`Welcome ${user.name}`, "success", 5)
    } catch (error) {
      showNotification("wrong credentials", "error", 5)
    }
  }

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")

    userDispatch({
      type: "CLEAR_USER",
    })
  }

  // Add new blog

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject)
    blogFormRef.current.toggleVisibility()
  }

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])

      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))

      showNotification(
        `A new blog "${newBlog.title}" by ${newBlog.author} added`,
        "success",
        5
      )
    },
    onError: () => {
      showNotification("Error creating blog", "error", 5)
    },
  })

  // Like a blog

  const handleLike = (blog) => {
    likeBlogMutation.mutate({
      id: blog.id,
      blog: { ...blog, likes: blog.likes + 1 },
    })
  }

  const likeBlogMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.update(id, blog),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])

      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) =>
          b.id === updatedBlog.id ? { ...updatedBlog, user: b.user } : b
        )
      )
    },
  })

  // Delete a blog

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedId) => {
      const blogs = queryClient.getQueryData(["blogs"])

      queryClient.setQueryData(
        ["blogs"],
        blogs.map((b) =>
          b.id === deletedId.id ? { ...deletedId, user: b.user } : b
        )
      )
    },
  })

  let content = null

  if (!user) {
    content = <LoginForm handleLogin={handleLogin} />
  } else {
    content = (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlogForm addBlog={addBlog} />
        </Togglable>

        <BlogsView
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {content}
    </div>
  )
}

export default App
