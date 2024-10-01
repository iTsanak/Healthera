import { Image, Pressable, useColorScheme, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";

import { selectUserFirstName, selectUserImageURL, selectUserLastName } from "@/redux/auth/auth-slice";
import { useAppSelector } from "@/redux/redux-hooks";

import { ThemedText } from "../ThemedText";

type Props = {
  showName?: boolean;
  size?: number;
  showBadge?: boolean;
  handleBadgeClick?: () => void;
};

const Avatar = ({ showName = false, size = 64, showBadge = false, handleBadgeClick = () => {} }: Props) => {
  const firstName = useAppSelector(selectUserFirstName);
  const lastName = useAppSelector(selectUserLastName);
  const imageURL = useAppSelector(selectUserImageURL);

  const theme = useColorScheme() ?? "dark";

  // Get user initials
  const fInitial = firstName ? `${firstName[0]}` : "??";
  const lInitial = lastName ? `${lastName[0]}` : "";
  const initials = `${fInitial}${lInitial}`;

  return (
    <View className="my-5 w-full items-center justify-center">
      <View style={{ height: size, width: size }} className="relative">
        <Pressable
          className="h-full w-full"
          onPress={() => {
            router.navigate("/profile");
          }}
        >
          {imageURL ? (
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}${imageURL}` }}
              className="h-full w-full rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors[theme].secondary, // You can customize the default background color
                alignItems: "center",
                justifyContent: "center",
                height: size,
                width: size,
                borderRadius: size / 2,
              }}
            >
              <Text style={{ color: Colors[theme].background, fontSize: size / 2.5 }}>{initials}</Text>
            </View>
          )}
        </Pressable>

        {showBadge && (
          <Pressable
            style={{ backgroundColor: Colors[theme].primary }}
            className="absolute bottom-1 right-1 rounded-full p-2"
            onPress={() => {
              console.log("pressed ICON");
              handleBadgeClick();
            }}
          >
            <Ionicons name="pencil-outline" color={Colors[theme].text} size={20} />
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
        {firstName ? `${firstName} ${lastName}` : "Error while loading name"}
      </ThemedText>
    </View>
  );
};

export default Avatar;
