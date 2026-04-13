import { useState } from "react"

import useUserStore from "../stores/userStore"
import useNotificationStore from "../stores/notificationStore"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = useUserStore((state) => state.login)

  const setNotification = useNotificationStore((state) => state.setNotification)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({
        username,
        password,
      })

      setNotification(`Welcome ${username}`, "success", 5)
    } catch (error) {
      setNotification("wrong credentials", "error", 5)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
