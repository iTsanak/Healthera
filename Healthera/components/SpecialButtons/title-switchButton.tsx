import { Switch, TouchableOpacity, useColorScheme, View, ViewProps } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  isActive: boolean;
  style?: ViewProps;
  handleOnPress: (value: boolean) => void;
};

const TitleSwitchButton = ({ title, style, isActive, handleOnPress }: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [isEnabled, setIsEnabled] = useState(isActive);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    handleOnPress(isEnabled);
  }, [isEnabled]);

  return (
    <View style={style} className="">
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={() => {
          toggleSwitch();
        }}
      >
        <View className="flex-1 pl-2">
          <ThemedText className="text-lg">{title}</ThemedText>
        </View>
        <View className="items-center justify-center rounded-full p-2">
          <Switch
            trackColor={{ false: "#767577", true: Colors[theme].primary }}
            thumbColor={isEnabled ? Colors[theme].accent : Colors[theme].text}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TitleSwitchButton;
