import { FlatList, View } from "react-native";
import Text from "./Text";
import useCurrentUser from "../../src/hooks/useCurrentUser";

const ReviewItem = ({ review }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 5,
        padding: 5,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: "#0366d6",
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
        }}
      >
        <Text style={{ color: "#0366d6", fontWeight: "bold" }}>
          {review.rating}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { user, loading } = useCurrentUser(true); // 👈 IMPORTANTE

  if (loading) return <Text>Loading...</Text>;

  const reviews = user?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default MyReviews;
