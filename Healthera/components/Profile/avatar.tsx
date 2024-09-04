import {
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { SessionUser } from "@/providers/session-provider";

type Props = {
  imageUri: string;
  showName?: boolean;
  user?: SessionUser;
  size?: number;
  showBadge?: boolean;
};

const Avatar = ({ imageUri, showName, size, showBadge, user }: Props) => {
  // 32 - 128px
  const theme = useColorScheme() ?? "dark";
  return (
    <View className="my-5 w-full items-center justify-center">
      <View style={{ height: size, width: size }} className="relative">
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
        {showBadge && (
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
        )}
      </View>
      <ThemedText
        style={{
          display: showName ? "flex" : "none",
          color: Colors[theme].text,
        }}
        className="mt-4 text-xl font-bold"
      >
        {user
          ? `${user.first_name} ${user.last_name}`
          : "Error while loading name"}
      </ThemedText>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
