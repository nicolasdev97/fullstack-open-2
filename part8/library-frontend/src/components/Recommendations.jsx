import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../graphql/queries";

const Recommendations = ({ show }) => {
  const { data: userData } = useQuery(ME);

  const favoriteGenre = userData?.me?.favoriteGenre;

  const { data, loading } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (!show) {
    return null;
  } else if (loading) {
    return <div>loading...</div>;
  }

  console.log("data", userData);
  console.log("favoriteGenre", favoriteGenre);

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>

      {data.allBooks.map((book) => (
        <div key={book.title}>
          {book.title} - {book.author.name}
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
