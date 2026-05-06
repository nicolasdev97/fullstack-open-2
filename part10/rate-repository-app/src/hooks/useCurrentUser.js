import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

const useCurrentUser = (includeReviews = false) => {
  const { data, loading, refetch } = useQuery(GET_ME, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  return {
    user: data?.me,
    loading,
    refetch,
  };
};

export default useCurrentUser;
