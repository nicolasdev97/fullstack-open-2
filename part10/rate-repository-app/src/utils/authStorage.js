import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
    this.key = `${namespace}:accessToken`;
  }

  async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(this.key);
      return token;
    } catch (e) {
      console.log("Error getting access token:", e);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(this.key, accessToken);
    } catch (e) {
      console.log("Error setting access token:", e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (e) {
      console.log("Error removing access token:", e);
    }
  }
}

export default AuthStorage;
