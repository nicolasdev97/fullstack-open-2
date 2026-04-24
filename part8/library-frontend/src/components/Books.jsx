import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../graphql/queries";
import { useState } from "react";

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}

        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
