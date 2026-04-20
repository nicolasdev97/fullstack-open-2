import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { ALL_AUTHORS } from "../graphql/queries";
import { EDIT_AUTHOR } from "../graphql/mutations";

const Authors = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const authors = data.allAuthors;

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    });

    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          author
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
