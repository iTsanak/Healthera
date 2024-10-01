import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";

const SocialButton = ({ iconName, onPress }: { iconName: keyof typeof Ionicons.glyphMap; onPress: () => void }) => {
  const theme = useColorScheme() ?? "dark";

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 48, // w-12 equivalent
          height: 48, // h-12 equivalent
          borderRadius: 24, // rounded-full equivalent
          backgroundColor: Colors[theme].secondary, // Your specific hex color
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={iconName} size={30} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
