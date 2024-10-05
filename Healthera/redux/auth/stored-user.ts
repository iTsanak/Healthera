import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./auth-slice";

export const setStoredUser = async (user: User) => {
  console.log("[STORAGE_USER]: fn setStoredUser: running...");
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem("STORED_USER", jsonValue);
  } catch (error) {
    console.log("[STORAGE_USER]: fn setStoredUser: failed in storing STORED_USER", error);
  }
};

export const getStoredUser = async () => {
  console.log("[STORAGE_USER]: fn getStoredUser: running...");
  try {
    const jsonValue = await AsyncStorage.getItem("STORED_USER");
    if (jsonValue != null) {
      const user: User = JSON.parse(jsonValue);
      return user.id ? user : null;
    }
    return null;
  } catch (error) {
    console.log("[STORAGE_USER]: failed in retrieving STORED_USER", error);
  }
  return null;
};

export const removeStoredUser = async () => {
  console.log("[STORAGE_USER]: fn removeStoredUser: running...");
  await AsyncStorage.removeItem("STORED_USER");
};
