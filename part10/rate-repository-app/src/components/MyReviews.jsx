import { FlatList, View, Alert, Pressable, Platform } from "react-native";
import Text from "./Text";
import useCurrentUser from "../../src/hooks/useCurrentUser";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useRouter } from "expo-router";

const ReviewItem = ({ review, onView, onDelete }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 5,
        padding: 5,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
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
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Pressable
          onPress={() => onView(review.repository.id)}
          style={{
            backgroundColor: "#0366d6",
            padding: 10,
            borderRadius: 5,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "white" }}>View repository</Text>
        </Pressable>

        <Pressable
          onPress={() => onDelete(review.id)}
          style={{
            backgroundColor: "#d73a4a",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white" }}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { user, loading, refetch } = useCurrentUser(true);

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = (id) => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?",
      );

      if (confirmed) {
        deleteAction(id);
      }
    } else {
      Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteAction(id),
          },
        ],
      );
    }
  };

  const deleteAction = async (id) => {
    try {
      await deleteReview({ variables: { id } });
      await refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const router = useRouter();

  const handleViewRepository = (repositoryId) => {
    router.push(`/repository/${repositoryId}`);
  };

  if (loading) return <Text>Loading...</Text>;

  const reviews = user?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onView={handleViewRepository}
          onDelete={handleDelete}
        />
      )}
    />
  );
};

export default MyReviews;
