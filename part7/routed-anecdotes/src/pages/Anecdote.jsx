import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { anecdoteType } from "../types/anecdotePropType";

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();

  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) {
    return <div>anecdote not found</div>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(anecdoteType).isRequired,
};

export default Anecdote;
