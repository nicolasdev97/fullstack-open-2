import { useEffect, useRef } from "react"

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import LoginForm from "./components/LoginForm"
import Blogs from "./components/Blogs"
import BlogDetails from "./components/BlogDetails"
import UsersView from "./components/UsersView"
import UserView from "./components/UserView"
import Notification from "./components/Notification"

import useUserStore from "./stores/userStore"

const App = () => {
  // User state

  const user = useUserStore((state) => state.user)

  // Load user

  const loadUser = useUserStore((state) => state.loadUser)

  // Logout

  const logout = useUserStore((state) => state.logout)

  // Ref for togglable blog form

  const blogFormRef = useRef()

  // Check if user is logged in

  useEffect(() => {
    loadUser()
  }, [])

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    logout()
  }

  // Content to render

  let content = null

  if (!user) {
    // If no user is logged in, show login form

    content = <LoginForm />
  } else {
    // If user is logged in, show blogs view and add blog form

    content = (
      <Router>
        <div>
          <div>
            <Link to="/">blogs</Link> <Link to="/users">users</Link>
          </div>

          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>

          <Routes>
            <Route path="/" element={<Blogs blogFormRef={blogFormRef} />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/users/:id" element={<UserView />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      </Router>
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
