import { useState } from "react";

import Login from "./components/Login";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { useApolloClient } from "@apollo/client/react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Login setToken={setToken} show={page === "login"} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
