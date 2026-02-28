import Blog from "./Blog";

const BlogsView = ({ blogs, handleLike }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default BlogsView;
