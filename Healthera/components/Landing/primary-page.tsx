import { ImageBackground, View, ImageSourcePropType } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";

const PrimaryPage = ({ source }: { source: ImageSourcePropType }) => {
  return (
    <ImageBackground source={source} className="flex-1" resizeMode="cover">
      <LinearGradient
        colors={["rgba(255,255,255,0.1)", "rgba(0,0,0,0.7)"]}
        locations={[0, 1]}
        start={[1, 0]}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <View className="relative flex-1 items-center justify-end">
            <View className="mb-[10%] w-[80%] items-center justify-end">
              <ThemedText className="mb-5 text-6xl font-bold text-white">Hello!</ThemedText>
              <ThemedText className="mb-36 text-xl text-white">Let's improve your life style</ThemedText>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

export default PrimaryPage;
