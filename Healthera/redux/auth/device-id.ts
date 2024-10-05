import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import { Platform } from "react-native";

export const getDeviceId = async () => {
  console.log("[DEVICE_ID]: fn getDeviceId: running...");

  let deviceId = await AsyncStorage.getItem("DEVICE_ID");
  if (!deviceId) {
    console.log("[DEVICE_ID]: fn getDeviceId: id not found in memory");

    if (Platform.OS === "ios") {
      deviceId = await Application.getIosIdForVendorAsync();
    } else {
      deviceId = Application.getAndroidId();
    }
    if (!deviceId) {
      console.log("[DEVICE_ID]: fn getDeviceId: failed in generating deviceID");
      throw new Error("failed to retrieve deviceId");
    }
    await AsyncStorage.setItem("DEVICE_ID", deviceId);
  }
  return deviceId;
};

export const removeDeviceId = async () => {
  console.log("[DEVICE_ID]: fn removeDeviceId: running...");
  await AsyncStorage.removeItem("DEVICE_ID");
};
