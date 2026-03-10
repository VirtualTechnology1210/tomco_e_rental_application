import AsyncStorage from "@react-native-async-storage/async-storage";
const ACCESS_TOKEN_KEY = "erental_access_token";
const REFRESH_TOKEN_KEY = "erental_refresh_token";
const tokenStorage = {
  async getAccessToken() {
    try {
      return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
      return null;
    }
  },
  async getRefreshToken() {
    try {
      return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  },
  async setTokens(accessToken, refreshToken) {
    try {
      await AsyncStorage.multiSet([
        [ACCESS_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken]
      ]);
    } catch (err) {
      console.error("[TokenStorage] setTokens error:", err);
    }
  },
  async clearTokens() {
    try {
      await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
    } catch (err) {
      console.error("[TokenStorage] clearTokens error:", err);
    }
  },
  async hasTokens() {
    const access = await this.getAccessToken();
    return !!access;
  }
};
export {
  tokenStorage
};
