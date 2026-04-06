import { useState, useEffect, useRef } from "react"

import LoginForm from "./components/LoginForm"
import BlogsView from "./components/BlogsView"
import AddBlogForm from "./components/AddBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

import { useDispatch, useSelector } from "react-redux"
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer"

import { initializeBlogs, likeBlog, deleteBlog } from "./reducers/blogReducer"

import { createBlog } from "./reducers/blogReducer"

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  // Get all blogs

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // Show notification

  const showNotification = (message, type) => {
    dispatch(setNotification({ message, type }))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  // Check if user is logged in

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)

      showNotification(`Welcome ${user.name}`, "success")
    } catch {
      showNotification("Wrong credentials", "error")
    }
  }

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    blogService.setToken(null)
    setUser(null)
  }

  // Add new blog

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))

      showNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} added`,
        "success"
      )

      blogFormRef.current.toggleVisibility()
    } catch {
      showNotification("Error creating blog", "error")
    }
  }

  // Like a blog

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  // Delete a blog

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
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
          <AddBlogForm createBlog={addBlog} />
        </Togglable>

        <BlogsView
          blogs={blogs}
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
