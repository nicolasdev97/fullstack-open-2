import { useState, useEffect, useRef } from "react";

import LoginForm from "./components/LoginForm";
import BlogsView from "./components/BlogsView";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  // Get all blogs

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Show notification

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Check if user is logged in

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Login

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);

      showNotification(`Welcome ${user.name}`, "success");
    } catch {
      showNotification("Wrong credentials", "error");
    }
  };

  // Logout

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  };

  // Add new blog

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(returnedBlog));

      showNotification(
        `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
        "success",
      );

      blogFormRef.current.toggleVisibility();
    } catch {
      showNotification("Error creating blog", "error");
    }
  };

  // Like a blog

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    const returnedBlog = await blogService.update(blog.id, updatedBlog);

    setBlogs(
      blogs.map((b) =>
        b.id === blog.id ? { ...returnedBlog, user: blog.user } : b,
      ),
    );
  };

  let content = null;

  if (!user) {
    content = (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    );
  } else {
    content = (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <AddBlogForm createBlog={createBlog} />
        </Togglable>

        <BlogsView blogs={blogs} handleLike={handleLike} />
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification} />
      {content}
    </div>
  );
};

export default App;
