import React from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

import { useRouter } from "expo-router";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Testing component (mocked data)
export const RepositoryListContainer = ({ repositories }) => {
  const router = useRouter();

  const repositoryNodes = repositories?.edges?.map((edge) => edge.node) || [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

// Real component (fetches data)
const RepositoryList = () => {
  const { repositories, loading } = useRepositories();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
