import { useState } from "react"
import useBlogStore from "../stores/blogStore"
import useNotificationStore from "../stores/notificationStore"

const AddBlogForm = ({ blogFormRef }) => {
  const createBlog = useBlogStore((state) => state.createBlog)
  const setNotification = useNotificationStore((state) => state.setNotification)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title,
      author,
      url,
    }

    try {
      await createBlog(blogObject)

      blogFormRef.current.toggleVisibility()

      setNotification(`a new blog ${blogObject.title} added`, "success", 5)

      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (error) {
      setNotification("error creating blog", "error", 5)
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>

      <div>
        author:
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
      </div>

      <div>
        url:
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default AddBlogForm
