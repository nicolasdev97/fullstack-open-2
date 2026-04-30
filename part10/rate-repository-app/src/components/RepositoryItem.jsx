import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  info: {
    marginLeft: 15,
    flexShrink: 1,
  },
  fullName: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "#586069",
  },
  language: {
    marginTop: 5,
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
  },
});

const formatCount = (value) => {
  return value >= 1000
    ? (value / 1000).toFixed(1).replace(".0", "") + "k"
    : value;
};

const Stat = ({ value, label }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{formatCount(value)}</Text>
    <Text>{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {/* Top part */}
      <View style={styles.topContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Stat value={item.stargazersCount} label="Stars" />
        <Stat value={item.forksCount} label="Forks" />
        <Stat value={item.reviewCount} label="Reviews" />
        <Stat value={item.ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
