import Blog from "./Blog";

const BlogsView = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsView;
