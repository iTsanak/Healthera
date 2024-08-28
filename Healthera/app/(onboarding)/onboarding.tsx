import { View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import PagerView from "react-native-pager-view";

import SomethingSVG from "@/assets/images/onboarding/exploring.svg";
import LoveItSVG from "@/assets/images/onboarding/love_it.svg";
import UnlockSVG from "@/assets/images/onboarding/unlock.svg";

import PrimaryButton from "@/components/Button/primary-button";
import GetStartedModal from "@/components/Modals/get-started-modal";
import CircleIndicator from "@/components/Landing/circle-indicator";
import PrimaryPage from "@/components/Landing/primary-page";
import SecondaryPageTemplate from "@/components/Landing/secondary-page";

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <PagerView
        className="flex-1"
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
      >
        <PrimaryPage
          key={1}
          source={require("@/assets/images/onboarding/background-1.jpg")}
        />
        <SecondaryPageTemplate key={2} Svg={SomethingSVG} />
        <SecondaryPageTemplate key={3} Svg={LoveItSVG} />
        <SecondaryPageTemplate key={4} Svg={UnlockSVG} />
      </PagerView>

      <View className="absolute bottom-24 left-0 right-0">
        <CircleIndicator currentPage={currentPage + 1} />
      </View>

      <View className="absolute bottom-6 left-0 right-0 items-center">
        <PrimaryButton
          handlePress={() => setIsModalVisible(true)}
          title="GET STARTED"
          className="w-[80%]"
        />
      </View>

      <GetStartedModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </View>
  );
}
