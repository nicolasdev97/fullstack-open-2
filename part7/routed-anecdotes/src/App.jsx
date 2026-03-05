import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Footer from "./components/Footer";

import initialAnecdotes from "./data/anecdotes";

import AnecdoteList from "./pages/AnecdoteList";
import Anecdote from "./pages/Anecdote";
import About from "./pages/About";
import CreateNew from "./pages/CreateNew";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      id: Math.round(Math.random() * 10000),
    };

    setAnecdotes(anecdotes.concat(newAnecdote));

    setNotification(`a new anecdote "${anecdote.content}" created!`);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      <Notification notification={notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
