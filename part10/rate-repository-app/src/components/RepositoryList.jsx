import { useState, useMemo } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

import { useRouter } from "expo-router";

import OrderSelector from "./OrderSelector";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 5,
  },
});

// Testing component (mocked data)
export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
      ListHeaderComponent={
        <View style={styles.header}>
          <OrderSelector order={order} setOrder={setOrder} />
        </View>
      }
    />
  );
};

// Real component (fetches data)
const RepositoryList = () => {
  const [order, setOrder] = useState("LATEST");

  const variables = useMemo(() => {
    switch (order) {
      case "HIGHEST":
        return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      case "LOWEST":
        return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      default:
        return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }
  }, [order]);

  const { repositories, loading } = useRepositories(variables);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
