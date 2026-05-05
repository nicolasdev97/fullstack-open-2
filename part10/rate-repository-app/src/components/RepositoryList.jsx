import { useState, useMemo } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

import { useRouter } from "expo-router";

import OrderSelector from "./OrderSelector";
import SearchInput from "./SearchInput";

import { useDebounce } from "use-debounce";

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

const RepositoryListHeader = ({ search, setSearch, order, setOrder }) => {
  return (
    <View style={{ backgroundColor: "#f5f5f5" }}>
      <SearchInput value={search} onChange={setSearch} />
      <OrderSelector order={order} setOrder={setOrder} />
    </View>
  );
};

// Testing component (mocked data)
export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  search,
  setSearch,
}) => {
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
        <RepositoryListHeader
          search={search}
          setSearch={setSearch}
          order={order}
          setOrder={setOrder}
        />
      }
    />
  );
};

// Real component (fetches data)
const RepositoryList = () => {
  const [order, setOrder] = useState("LATEST");
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const variables = useMemo(() => {
    let orderVars;

    switch (order) {
      case "HIGHEST":
        orderVars = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
        break;
      case "LOWEST":
        orderVars = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
        break;
      default:
        orderVars = { orderBy: "CREATED_AT", orderDirection: "DESC" };
    }

    return {
      ...orderVars,
      searchKeyword: debouncedSearch || undefined,
    };
  }, [order, debouncedSearch]);

  const { repositories, loading } = useRepositories(variables);

  if (loading) return <Text>Loading...</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default RepositoryList;
