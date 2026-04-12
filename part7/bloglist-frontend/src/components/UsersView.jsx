import { useEffect } from "react"
import useUserStore from "../stores/userStore"

const UsersView = () => {
  const users = useUserStore((state) => state.users)
  const fetchUsers = useUserStore((state) => state.fetchUsers)

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
