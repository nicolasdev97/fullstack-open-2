import { useState } from "react"
import { Link } from "react-router-dom"

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="list-group">
      <Link
        to={`/blogs/${blog.id}`}
        className="list-group-item list-group-item-action"
      >
        {blog.title} <br /> {blog.author} <br />
        {/* <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button> */}
      </Link>

      {/* {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          {blog.user?.user === user?.username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )} */}
    </div>
  )
}

export default Blog
