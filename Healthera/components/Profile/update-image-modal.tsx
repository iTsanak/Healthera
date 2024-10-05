import {
  View,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";

import logAxiosError from "@/lib/axios-better-errors";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";

import { Colors } from "@/constants/Colors";

import ImagePickerModal from "./image-picker-modal";

import { useChangeProfileImageMutation } from "@/redux/auth/auth-slice";

const UpdateImageModal = ({
  isVisible,
  onClose,
}: Readonly<{
  isVisible: boolean;
  onClose: () => void;
}>) => {
  const theme = useColorScheme() ?? "dark";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [uploadNewImage, { isError, isLoading, isSuccess }] = useChangeProfileImageMutation();

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
      console.log("[UPDATE_IMAGE_MODAL]: Error resizing image:", error);
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
      setModalVisible(false); // Close the modal after selecting an image
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;
    try {
      const response = await uploadNewImage({ imageUri: selectedImage }).unwrap();
      console.log("[UPDATE_IMAGE_MODAL]: Image uploaded successfully");
      onClose();
      setSelectedImage(null);
    } catch (error) {
      console.log("[UPDATE_IMAGE_MODAL]: Error uploading image", error);
      logAxiosError(error, "[UPDATE_IMAGE_MODAL]: Error uploading image");
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const cancelUpload = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (isVisible) setModalVisible(true);
    else setModalVisible(false);

    return () => {
      setModalVisible(false);
    };
  }, [isVisible]);

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible} onRequestClose={onClose}>
      <ThemedView className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center">
            <SimpleTopNavBar title="Change Profile Image" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View className="mb-20 w-[85%] pt-10">
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
                          onPress={async () => {
                            cancelUpload();
                            onClose();
                          }}
                          disabled={isLoading}
                        >
                          <ThemedText style={{ color: Colors[theme].background }}>Cancel</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ backgroundColor: "#00ff00", padding: 10, borderRadius: 5 }}
                          onPress={async () => {
                            uploadImage();
                            await new Promise((resolve) =>
                              setTimeout(() => {
                                onClose();
                                return resolve;
                              }, 500),
                            );
                          }}
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

            <ImagePickerModal
              isVisible={modalVisible}
              onClose={() => {
                setModalVisible(false);
                onClose();
              }}
              onCameraPress={() => pickImage(true)}
              onGalleryPress={() => pickImage(false)}
            />
          </View>
        </SafeAreaView>
      </ThemedView>
    </Modal>
  );
};

export default UpdateImageModal;
