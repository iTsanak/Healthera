import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import IconTitleArrow from "@/components/SpecialButtons/icon-title-arrow";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Avatar from "@/components/Profile/avatar";

type Props = {};

const ProfileScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="My Profile" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Avatar
              imageUri="https://utfs.io/f/e96b95ab-b00a-4801-bcc7-4946f71c11f2-cnxr61.jpeg"
              showName={true}
            />
            <View className="mb-20 w-[80%] gap-y-5">
              <IconTitleArrow
                title="Profile"
                icon="person"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/update-profile");
                }}
              />
              <IconTitleArrow
                title="Favorite"
                icon="heart"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Privacy Policy"
                icon="lock-closed"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Settings"
                icon="settings"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Help"
                icon="help-outline"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Logout"
                icon="log-out-outline"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default ProfileScreen;
