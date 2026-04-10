import { useEffect } from "react"
import Blog from "./Blog"
import useUserStore from "../stores/userStore"
import useBlogStore from "../stores/blogStore"
import useNotificationStore from "../stores/notificationStore"

const BlogsView = ({ user }) => {
  const blogs = useBlogStore((state) => state.blogs)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLike = (blog) => {
    likeBlog(blog)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      {sortedBlogs.map((blog) => (
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
