import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// SET
//////////////////////////////////////////////////////////////

export const setAllStoredTokens = async (accessToken: string, refreshToken: string) => {
  console.log("[STORAGE_TOKENS]: fn setAllStoredTokens: running...");
  await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
  await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
};

export const setStoredAccessToken = async (accessToken: string) => {
  console.log("[STORAGE_TOKENS]: fn setStoredAccessToken: running...");
  await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
};

export const setStoredRefreshToken = async (refreshToken: string) => {
  console.log("[STORAGE_TOKENS]: fn setStoredRefreshToken: running...");
  await AsyncStorage.setItem("REFRESH_TOKEN", refreshToken);
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// GET
//////////////////////////////////////////////////////////////

export const getAllStoredTokens = async () => {
  console.log("[STORAGE_TOKENS]: fn getAllStoredTokens: running...");
  const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
  const refreshToken = await AsyncStorage.getItem("REFRESH_TOKEN");
  return { accessToken, refreshToken };
};

export const getStoredAccessToken = async () => {
  console.log("[STORAGE_TOKENS]: fn getStoredAccessToken: running...");
  return await AsyncStorage.getItem("ACCESS_TOKEN");
};

export const getStoredRefreshToken = async () => {
  console.log("[STORAGE_TOKENS]: fn getStoredRefreshToken: running...");
  return await AsyncStorage.getItem("REFRESH_TOKEN");
};
//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// REMOVE
//////////////////////////////////////////////////////////////

export const removeAllStoredTokens = async () => {
  console.log("[STORAGE_TOKENS]: fn removeAllStoredTokens: running...");
  await AsyncStorage.removeItem("ACCESS_TOKEN");
  await AsyncStorage.removeItem("REFRESH_TOKEN");
};

export const removeStoredAccessToken = async () => {
  console.log("[STORAGE_TOKENS]: fn removeAllStoredTokens: running...");
  await AsyncStorage.removeItem("ACCESS_TOKEN");
};

export const removeStoredRefreshToken = async () => {
  console.log("[STORAGE_TOKENS]: fn removeAllStoredTokens: running...");
  await AsyncStorage.removeItem("REFRESH_TOKEN");
};
