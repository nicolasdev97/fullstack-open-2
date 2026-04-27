import { gql } from "@apollo/client";

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`;
