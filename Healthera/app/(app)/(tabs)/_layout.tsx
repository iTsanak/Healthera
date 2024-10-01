import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export default function TabsLayout() {
  const theme = useColorScheme() ?? "dark";

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "index":
              iconName = focused ? "home" : "home-outline";
              break;
            case "summary":
              iconName = focused ? "stats-chart" : "stats-chart-outline";
              break;
            case "new":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "calendar":
              iconName = focused ? "calendar" : "calendar-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "boat";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors[theme].text,
        tabBarInactiveTintColor: Colors[theme].background,
        tabBarStyle: {
          backgroundColor: Colors[theme].secondary,
          height: 60,
          paddingBottom: 10,
          marginBottom: 10,
          borderRadius: 30,
          marginHorizontal: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="summary" options={{ title: "Summary", headerShown: false }} />
      <Tabs.Screen name="new" options={{ title: "New", headerShown: false }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar", headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
    </Tabs>
  );
}
