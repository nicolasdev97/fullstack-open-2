import React from "react";
import { View, Pressable, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GET_REPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import * as Linking from "expo-linking";

import RepositoryItem from "../../src/components/RepositoryItem";

const RepositoryView = () => {
  const { id } = useLocalSearchParams();
  const repositoryId = Array.isArray(id) ? id[0] : id;

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const repository = data?.repository;

  return (
    <View>
      <RepositoryItem item={repository} />

      <Pressable
        onPress={() => Linking.openURL(repository.url)}
        style={{
          backgroundColor: "#0366d6",
          padding: 12,
          borderRadius: 5,
          margin: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

export default RepositoryView;
