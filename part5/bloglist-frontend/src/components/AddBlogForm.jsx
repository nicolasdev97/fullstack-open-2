import { useState } from "react";

const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Title"
        />
      </div>

      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Author"
        />
      </div>

      <div>
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="URL"
        />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default AddBlogForm;
