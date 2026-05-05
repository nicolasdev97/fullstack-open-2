import React from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "expo-router";

import ReviewForm from "../components/ReviewForm";
import { CREATE_REVIEW } from "../graphql/mutations";

const CreateReview = () => {
  const router = useRouter();

  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    try {
      const { ownerName, repositoryName, rating, text } = values;

      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });

      const repositoryId = data.createReview.repositoryId;

      router.push(`/repository/${repositoryId}`);
    } catch (e) {
      console.log("ERROR:", e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
