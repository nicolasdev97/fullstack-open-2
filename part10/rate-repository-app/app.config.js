import "dotenv/config";

export default {
  expo: {
    name: "rate-repository-app",
    slug: "rate-repository-app",
    extra: {
      apolloUri: process.env.APOLLO_URI,
    },
  },
};
