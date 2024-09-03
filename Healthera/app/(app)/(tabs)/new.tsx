import React, { useState } from "react";
import {
  View,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { UPLOAD_URL } from "@/API/upload";
import { useAnalysis } from "@/providers/analysis-provider";
import { useAPI } from "@/providers/api-provider";
import logAxiosError from "@/lib/axios-better-errors";
import { ActivityIndicator } from "react-native";




type Props = {};

const NewScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [sortOrder, setSortOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { api } = useAPI();

  const { setUuid } = useAnalysis();

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
    }

    const { status: libraryStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== "granted") {
      alert("Sorry, we need photo library permissions to make this work!");
    }
  };

  

  React.useEffect(() => {
    requestPermissions();
  }, []);

  const resizeImage = async (uri: string) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Adjust the width as needed
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }, // Compress image to reduce size
      );
      return manipResult.uri;
    } catch (error) {
      console.error("[NEW_SCREEN]: Error resizing image:", error);
      return uri;
    }
  };

  const uploadImage = async (fromCamera: boolean) => {
   
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
    setIsLoading(true);
    if (!result.canceled) {
      const resizedUri = await resizeImage(result.assets[0].uri);
      setSelectedImage(resizedUri);
      // Send the resized image to the backend
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);

      try {
        const response = await api.post(UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = response.data;
        console.log(data);
        setUuid(data.uuid); // This will trigger the polling
        console.log("[NEW_SCREEN]: Image uploaded successfully");
        setIsLoading(false); // End loading
      } catch (error) {
        console.log("[NEW_SCREEN]: Error uploading image", error);
        logAxiosError(error, "[NEW_SCREEN]: Error uploading image");
      } 
    } else {
      setIsLoading(false); // End loading if canceled
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert("Upload Image", "Choose an option", [
      { text: "Camera", onPress: () => uploadImage(true) },
      { text: "Gallery", onPress: () => uploadImage(false) },
      { text: "Cancel", style: "cancel" },
    ]);
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
                <ThemedText className="mb-4 text-lg font-bold">
                  Upload picture of the ingredients
                </ThemedText>
                <ThemedText className="mb-4">Scan items</ThemedText>
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].secondary }}
                  className="rounded-3xl p-2 px-4"
                  onPress={showImagePickerOptions}
                >
                  <ThemedText style={{ color: Colors[theme].background }}>
                    Upload
                  </ThemedText>
                </TouchableOpacity>
              </View>
              {isLoading ? (
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  {/* Display the loading animation */}
                  <ActivityIndicator size="large" color={Colors[theme].secondary} />
                </View>
              ) : (
                selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{
                      width: 200,
                      height: 200,
                      marginTop: 20,
                      borderRadius: 10,
                      marginBottom: 20,
                      alignSelf: "center",
                    }}
                  />
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
