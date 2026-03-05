import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

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
          <input {...content} />
        </div>

        <div>
          author
          <input {...author} />
        </div>

        <div>
          url for more info
          <input {...info} />
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
