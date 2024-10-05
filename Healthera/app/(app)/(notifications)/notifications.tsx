import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { allNotificationsRead, selectAllNotifications } from "@/redux/notifications/notifications-slice";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import NotificationCard from "@/components/Notifications/notification-card";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";

const NotificationScreen = () => {
  const notifications = useAppSelector(selectAllNotifications).reverse();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(allNotificationsRead());
    };
  }, []);

  const handlePressNotification = (id: string) => {
    // Handle notification press (e.g., mark as read or navigate)
    console.log(`Notification ${id} clicked`);
  };

  const content = () => {
    if (notifications.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <ThemedText>No notifications found.</ThemedText>
        </View>
      );
    } else {
      return (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard notification={item} onPress={() => handlePressNotification(item.id)} />
          )}
        />
      );
    }
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <SimpleTopNavBar title="Notifications" />
          {content()}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default NotificationScreen;
