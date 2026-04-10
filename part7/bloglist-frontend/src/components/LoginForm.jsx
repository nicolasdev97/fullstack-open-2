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
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
