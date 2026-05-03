import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// This component is for testing purposes
export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      {repositoryNodes.map((repo) => (
        <RepositoryItem key={repo.id} item={repo} />
      ))}
    </>
  );
};

// This component is for production use
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
