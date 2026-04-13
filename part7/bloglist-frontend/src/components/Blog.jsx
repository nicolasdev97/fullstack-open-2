import { useState } from "react"
import { Link } from "react-router-dom"

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <Link to={`/blogs/${blog.id}`} className="blog-summary">
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
