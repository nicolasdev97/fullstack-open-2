import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../graphql/queries";

const Books = ({ show }) => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const books = data.allBooks;

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
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
