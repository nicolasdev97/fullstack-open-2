import { useEffect } from "react"
import { Link } from "react-router-dom"
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
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
