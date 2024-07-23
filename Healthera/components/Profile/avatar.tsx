import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

type Props = {
  imageUri: string;
  showName?: boolean;
};

const Avatar = ({ imageUri, showName }: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View className="my-5 w-full items-center justify-center">
      <View className="relative h-32 w-32">
        <Pressable
          className="h-full w-full"
          onPress={() => {
            console.log("pressed IMAGE");
          }}
        >
          <Image
            source={{
              uri: imageUri,
            }}
            className="h-full w-full rounded-full"
            resizeMode="cover"
          />
        </Pressable>
        <Pressable
          style={{ backgroundColor: Colors[theme].primary }}
          className="absolute bottom-1 right-1 rounded-full p-2"
          onPress={() => {
            console.log("pressed ICON");
          }}
        >
          <Ionicons
            name="pencil-outline"
            color={Colors[theme].text}
            size={20}
          />
        </Pressable>
      </View>
      <ThemedText
        style={{ display: showName ? "flex" : "none" }}
        className="mt-4 text-xl font-bold"
      >
        NAME
      </ThemedText>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
