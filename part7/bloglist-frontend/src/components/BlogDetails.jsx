import { useParams } from "react-router-dom"
import useBlogStore from "../stores/blogStore"

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useBlogStore((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  const handleLike = (blog) => {
    likeBlog(blog)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <div>{blog.url}</div>

      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>

      <div>added by {blog.user?.username}</div>

      <div>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  )
}

export default BlogDetails
