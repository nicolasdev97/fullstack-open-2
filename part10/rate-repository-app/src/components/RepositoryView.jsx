import { FlatList, View, Pressable } from "react-native";
import Text from "./Text";
import * as Linking from "expo-linking";

import ReviewItem from "./ReviewItem";
import RepositoryItem from "../../src/components/RepositoryItem";

import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useLocalSearchParams } from "expo-router";

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

  const reviews = repository?.reviews?.edges?.map((edge) => edge.node) || [];

  const ItemSeparator = () => (
    <View style={{ height: 10, backgroundColor: "lightgray" }} />
  );

  const RepositoryHeader = () => (
    <View style={{ backgroundColor: "white" }}>
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
      <ItemSeparator />
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={RepositoryHeader}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryView;
