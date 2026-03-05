import PropTypes from "prop-types";
import { anecdoteType } from "../types/anecdotePropType";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
);

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(anecdoteType).isRequired,
};

export default AnecdoteList;
