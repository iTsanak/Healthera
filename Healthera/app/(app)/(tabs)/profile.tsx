import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";

import Avatar from "@/components/Profile/avatar";
import { ThemedView } from "@/components/ThemedView";
import LogoutModal from "@/components/Modals/logout";
import IconTitleArrow from "@/components/SpecialButtons/icon-title-arrow";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import UpdateImageModal from "@/components/Profile/update-image-modal";

const ProfileScreen = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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
              showName={true}
              showBadge={true}
              size={128}
              handleBadgeClick={() => {
                setIsImageModalOpen(true);
              }}
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
                  router.push("/privacy-policy");
                }}
              />
              <IconTitleArrow
                title="Terms and Conditions"
                icon="lock-closed"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/terms-and-conditions");
                }}
              />
              <IconTitleArrow
                title="Settings"
                icon="settings"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/settings");
                }}
              />
              <IconTitleArrow
                title="Help"
                icon="help-outline"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/help-center");
                }}
              />
              <IconTitleArrow
                title="Logout"
                icon="log-out-outline"
                handleOnPress={() => {
                  console.log("pressed");
                  setIsLogoutModalOpen(true);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <LogoutModal
        isVisible={isLogoutModalOpen}
        onClose={() => {
          setIsLogoutModalOpen(false);
        }}
      />

      <UpdateImageModal
        isVisible={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
        }}
      />
    </ThemedView>
  );
};
export default ProfileScreen;
