import { View, ScrollView, useColorScheme, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { router } from "expo-router";

import logAxiosError from "@/lib/axios-better-errors";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";

import { Colors } from "@/constants/Colors";

import { useAnalysis } from "@/providers/analysis-provider";

import { useUploadNewProductMutation } from "@/redux/products/products-slice";

const NewScreen = () => {
  const theme = useColorScheme() ?? "dark";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [uploadNewProduct, { isError, isLoading, isSuccess }] = useUploadNewProductMutation();

  const { setUuid } = useAnalysis();

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }

    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== "granted") {
      alert("Sorry, we need photo library permissions to make this work!");
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);

  const resizeImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 800 } }], {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
      });
      return manipResult.uri;
    } catch (error) {
      console.log("[NEW_SCREEN]: Error resizing image:", error);
      return uri;
    }
  };

  const pickImage = async (fromCamera: boolean) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const resizedUri = await resizeImage(result.assets[0].uri);
      setSelectedImage(resizedUri);
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;
    try {
      const response = await uploadNewProduct({ imageUri: selectedImage }).unwrap();

      setUuid(response.uuid);
      console.log("[NEW_SCREEN]: Image uploaded successfully", `image uuid: ${response.uuid}`);
      setSelectedImage(null);
      router.navigate("/(app)/(tabs)/");
    } catch (error) {
      console.log("[NEW_SCREEN]: Error uploading image", error);
      logAxiosError(error, "[NEW_SCREEN]: Error uploading image");
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera", onPress: () => pickImage(true) },
      { text: "Gallery", onPress: () => pickImage(false) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const cancelUpload = () => {
    setSelectedImage(null);
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Scan New Product" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mb-20 w-[85%] pt-10">
              <View
                style={{ backgroundColor: Colors[theme].primary }}
                className="items-center justify-center rounded-3xl p-4 py-8"
              >
                <ThemedText className="mb-4 text-lg font-bold">Upload picture of the ingredients</ThemedText>
                <ThemedText className="mb-4">Scan items</ThemedText>
                {!selectedImage && (
                  <TouchableOpacity
                    style={{ backgroundColor: Colors[theme].secondary }}
                    className="rounded-3xl p-2 px-4"
                    onPress={showImagePickerOptions}
                  >
                    <ThemedText style={{ color: Colors[theme].background }}>Upload</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
              {isLoading ? (
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <ActivityIndicator size="large" color={Colors[theme].secondary} />
                </View>
              ) : (
                selectedImage && (
                  <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        marginBottom: 20,
                      }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                      <TouchableOpacity
                        style={{ backgroundColor: "#ff0000", padding: 10, borderRadius: 5 }}
                        onPress={cancelUpload}
                        disabled={isLoading}
                      >
                        <ThemedText style={{ color: Colors[theme].background }}>Cancel</ThemedText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ backgroundColor: "#00ff00", padding: 10, borderRadius: 5 }}
                        onPress={uploadImage}
                        disabled={isLoading}
                      >
                        <ThemedText style={{ color: Colors[theme].background }}>Confirm Upload</ThemedText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default NewScreen;
