import { useQuery } from "@tanstack/react-query"
import blogService from "../services/blogs"
import Blog from "./Blog"

const BlogsView = ({ user, handleLike, handleDelete }) => {
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  })

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default BlogsView
