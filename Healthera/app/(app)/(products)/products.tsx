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
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';

type Props = {};

const ProductsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [sortOrder, setSortOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }

    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryStatus !== 'granted') {
      alert('Sorry, we need photo library permissions to make this work!');
    }
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);

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

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // Send the image to the backend
      const formData = new FormData();
      formData.append('image', {
        uri: result.assets[0].uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);

      try {
        const response = await fetch('https://d593-2607-fea8-fd40-8437-4490-6f64-b5ab-5783.ngrok-free.app/upload/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!response.ok) {
          
          throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}`);
        }
      
      

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => uploadImage(true) },
        { text: 'Gallery', onPress: () => uploadImage(false) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Products" />
          <View className="w-full flex-row items-center px-4">
            <ThemedText className="mr-1">Sort By</ThemedText>
            <TouchableOpacity
              style={{ backgroundColor: Colors[theme].primary }}
              className="flex-row items-center justify-center rounded-full p-1 px-2"
              onPress={() => {
                setSortOrder(!sortOrder);
              }}
            >
              <ThemedText className="mr-1">A</ThemedText>
              <Ionicons
                name={
                  sortOrder ? "arrow-forward-outline" : "arrow-back-outline"
                }
                size={15}
                color={Colors[theme].text}
              />
              <ThemedText className="ml-1">Z</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: Colors[theme].accent }}
              className="ml-2 items-center justify-center rounded-full p-1"
              onPress={() => {
                setIsFavorite(!isFavorite);
              }}
            >
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={20}
                color={Colors[theme].text}
              />
            </TouchableOpacity>

            <View className="flex-1 items-end justify-center">
              <View className="flex-row">
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].accent }}
                  className="items-center justify-center rounded-full p-1"
                  onPress={() => {
                    console.log("pressed");
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={Colors[theme].text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].accent }}
                  className="ml-2 items-center justify-center rounded-full p-1"
                  onPress={() => {
                    console.log("pressed");
                  }}
                >
                  <Ionicons
                    name="filter"
                    size={20}
                    color={Colors[theme].text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

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
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10, marginBottom: 20, alignSelf: 'center' }}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ProductsScreen;
