import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { Formik } from "formik";
import { validationSchema } from "../utils/validationReviewForm"; // ajusta ruta

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: "",
        repositoryName: "",
        rating: "",
        text: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View>
          {/* Owner */}
          <TextInput
            placeholder="Repository owner name"
            style={styles.input}
            value={values.ownerName}
            onChangeText={handleChange("ownerName")}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>{errors.ownerName}</Text>
          )}

          {/* Repo name */}
          <TextInput
            placeholder="Repository name"
            style={styles.input}
            value={values.repositoryName}
            onChangeText={handleChange("repositoryName")}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>{errors.repositoryName}</Text>
          )}

          {/* Rating */}
          <TextInput
            placeholder="Rating 0-100"
            style={styles.input}
            value={values.rating}
            onChangeText={handleChange("rating")}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.error}>{errors.rating}</Text>
          )}

          {/* Text */}
          <TextInput
            placeholder="Review"
            style={styles.input}
            value={values.text}
            onChangeText={handleChange("text")}
            multiline
          />

          {/* Button */}
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Create a review
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
