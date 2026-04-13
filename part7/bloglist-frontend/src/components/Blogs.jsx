import AddBlogForm from "./AddBlogForm"
import BlogsView from "./BlogsView"
import Togglable from "./Togglable"

const Blogs = ({ blogFormRef }) => {
  return (
    <div>
      <h2>blogs</h2>

      <Togglable ref={blogFormRef}>
        <AddBlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogsView />
    </div>
  )
}

export default Blogs
