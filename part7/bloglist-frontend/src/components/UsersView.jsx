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
    <div className="container mt-4">
      <h2>Users</h2>

      <table className="table table-striped">
        <tbody className="table-group-divider">
          <tr className="table-secondary">
            <th>User</th>
            <th>Blogs created</th>
          </tr>

          {users.map((user) => (
            <tr key={user.id} className="table-light">
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
