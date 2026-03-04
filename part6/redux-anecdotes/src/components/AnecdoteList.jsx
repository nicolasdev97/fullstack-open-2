import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();

    return [...state.anecdotes]
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(voteAnecdote(anecdote.id));
                dispatch(
                  setNotificationWithTimeout(
                    `You voted '${anecdote.content}'`,
                    5,
                  ),
                );
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
