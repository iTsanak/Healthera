import { TouchableOpacity, StyleSheet, useColorScheme, View } from "react-native";
import React from "react";

import { AppNotification } from "@/redux/notifications/notifications-slice";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

interface NotificationCardProps {
  notification: AppNotification;
  onPress: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onPress }) => {
  const theme = useColorScheme() ?? "dark";

  const currentTimestamp = Date.now(); // Current timestamp
  const diffInMs = currentTimestamp - notification.timestamp; // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

  return (
    <TouchableOpacity style={{ borderColor: Colors[theme].accent }} className="m-4 border-2 p-3" onPress={onPress}>
      <ThemedView className="relative justify-between">
        <ThemedText style={styles.title}>{notification.title}</ThemedText>
        <ThemedText style={styles.details}>{notification.details}</ThemedText>
        <ThemedText style={styles.timestamp}>{new Date(notification.timestamp).toLocaleString()}</ThemedText>
        {diffInMinutes < 10 && (
          <View className={"absolute right-0 top-0 rounded-2xl bg-cyan-300 p-1 dark:bg-cyan-700"}>
            <ThemedText className="text-sm">NEW</ThemedText>
          </View>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#6c6c6c",
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
});

export default NotificationCard;
