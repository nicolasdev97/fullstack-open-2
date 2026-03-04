import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: "If it hurts, do it more often",
    id: "1",
    votes: 0,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "2",
    votes: 0,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);

      anecdoteToVote.votes += 1;
    },

    createAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
