import { useEffect } from "react"
import Blog from "./Blog"
import useBlogStore from "../stores/blogStore"

const BlogsView = ({ user }) => {
  const blogs = useBlogStore((state) => state.blogs)
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="container mt-4">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogsView
