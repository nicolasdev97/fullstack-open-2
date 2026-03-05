import PropTypes from "prop-types";

export const anecdoteType = PropTypes.shape({
  content: PropTypes.string.isRequired,
  author: PropTypes.string,
  votes: PropTypes.number,
  id: PropTypes.number.isRequired,
  info: PropTypes.string.isRequired,
});
