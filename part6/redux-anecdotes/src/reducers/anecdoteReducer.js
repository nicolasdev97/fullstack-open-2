import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    updateAnecdote(state, action) {
      const updated = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updated.id ? updated : anecdote,
      );
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;

// Thunks

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/anecdotes");
    const data = await response.json();
    dispatch(setAnecdotes(data));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      votes: 0,
    };

    const response = await fetch("http://localhost:3001/anecdotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnecdote),
    });

    const data = await response.json();

    dispatch(appendAnecdote(data));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const response = await fetch(
      `http://localhost:3001/anecdotes/${anecdote.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAnecdote),
      },
    );

    const data = await response.json();

    dispatch(updateAnecdote(data));
  };
};
