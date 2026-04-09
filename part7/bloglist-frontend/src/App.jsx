import { useState, useEffect, useRef } from "react"

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

import useBlogStore from "./stores/blogStore"

import useUserStore from "./stores/userStore"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const createBlog = useBlogStore((state) => state.createBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  const loadUser = useUserStore((state) => state.loadUser)
  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)

  const user = useUserStore((state) => state.user)

  const [notification, dispatch] = useNotification()

  const blogFormRef = useRef()

  const queryClient = useQueryClient()

  // Refetch blogs after mutation

  queryClient.invalidateQueries({ queryKey: ["blogs"] })

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
    loadUser()
  }, [])

  // Login

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({
        username,
        password,
      })

      showNotification(`Welcome ${username}`, "success", 5)
    } catch {
      showNotification("Wrong credentials", "error", 5)
    }
  }

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    logout()
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
    likeBlog(blog)
  }

  // Delete a blog

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  let content = null

  if (!user) {
    content = (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    )
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
