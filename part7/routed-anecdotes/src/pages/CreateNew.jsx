import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content,
      author,
      info,
      votes: 0,
    });

    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>

        <div>
          author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div>
          url for more info
          <input value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>

        <button>create</button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

export default CreateNew;
