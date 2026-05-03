module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|expo-router|expo-modules-core|expo-modules-core/src)/)",
  ],
};
