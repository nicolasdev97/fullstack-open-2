import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    dispatch(
      createAnecdote({
        content,
        id: (Math.random() * 1000000).toFixed(0),
        votes: 0,
      }),
    );

    dispatch(setNotificationWithTimeout(`You created '${content}'`, 5));
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
