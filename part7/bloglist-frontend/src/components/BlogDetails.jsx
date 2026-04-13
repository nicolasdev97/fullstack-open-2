import { useState } from "react"
import { useParams } from "react-router-dom"
import useBlogStore from "../stores/blogStore"

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useBlogStore((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  const likeBlog = useBlogStore((state) => state.likeBlog)
  const deleteBlog = useBlogStore((state) => state.deleteBlog)

  const addComment = useBlogStore((state) => state.addComment)
  const [comment, setComment] = useState("")

  const handleLike = (blog) => {
    likeBlog(blog)
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()

    await addComment(blog.id, comment)

    setComment("")
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

      <h3>comments</h3>

      <form onSubmit={handleAddComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
