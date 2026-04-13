import { useParams } from "react-router-dom"
import useUserStore from "../stores/userStore"

const UserView = () => {
  const { id } = useParams()
  const users = useUserStore((state) => state.users)

  const user = users.find((u) => u.id === id)

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>

      <ul className="list-group list-group-flush">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="list-group-item">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
