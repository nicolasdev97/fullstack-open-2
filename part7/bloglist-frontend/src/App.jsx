import { useState, useEffect, useRef } from "react"

import LoginForm from "./components/LoginForm"
import BlogsView from "./components/BlogsView"
import AddBlogForm from "./components/AddBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

import { useDispatch, useSelector } from "react-redux"
import useNotificationStore from "./stores/notificationStore"

import useBlogStore from "./stores/blogStore"

import {
  initializeBlogs,
  likeBlog,
  deleteBlog,
  createBlog,
} from "./reducers/blogReducer"

import { initializeUser, loginUser, clearUser } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = useSelector((state) => state.user)

  const blogs = useBlogStore((state) => state.blogs)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const createBlog = useBlogStore((state) => state.createBlog)
  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  // Get all blogs

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Show notification

  const setNotification = useNotificationStore((state) => state.setNotification)

  // Check if user is logged in

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  // Login

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(
        loginUser({
          username,
          password,
        })
      )

      setNotification(`Welcome ${username}`, "success", 5)
    } catch {
      setNotification("Wrong credentials", "error", 5)
    }
  }

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    dispatch(clearUser())
  }

  // Add new blog

  const addBlog = async (blogObject) => {
    try {
      await createBlog(blogObject)

      setNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} added`,
        "success"
      )

      blogFormRef.current.toggleVisibility()
    } catch {
      setNotification("Error creating blog", "error")
    }
  }

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
