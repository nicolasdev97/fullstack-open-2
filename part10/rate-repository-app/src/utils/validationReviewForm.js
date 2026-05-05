import * as yup from "yup";

export const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner is required"),

  repositoryName: yup.string().required("Repository name is required"),

  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),

  text: yup.string().optional(),
});
