import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const { reset: resetContent, ...contentProps } = content;
  const { reset: resetAuthor, ...authorProps } = author;
  const { reset: resetInfo, ...infoProps } = info;

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    handleReset();

    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>

        <div>
          author
          <input {...authorProps} />
        </div>

        <div>
          url for more info
          <input {...infoProps} />
        </div>

        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

export default CreateNew;
