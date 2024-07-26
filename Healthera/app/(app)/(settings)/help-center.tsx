import { View, ScrollView, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import SearchBox from "@/components/Settings/search-box";
import SelectableButton from "@/components/Button/selectable-button";
import DropdownItem from "@/components/Settings/dropdown-item";

type Props = {};

const SettingsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [majorPage, setMajorPage] = useState<"FAQ" | "CONTACT US">("FAQ");
  const [faqTopic, setFaqTopic] = useState<"POPULAR" | "GENERAL" | "SERVICES">(
    "POPULAR",
  );

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <View
            className="w-full items-center justify-center"
            style={{ backgroundColor: Colors[theme].primary }}
          >
            <SimpleTopNavBar title="Help Center" />
            <ThemedText>How Can We Help You?</ThemedText>
            <SearchBox handleSearch={() => {}} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mt-10" />
            <View className="mb-20 w-[85%] gap-y-5">
              <View className="flex-row justify-around">
                <SelectableButton
                  className="h-14 w-36"
                  title="FAQ"
                  handlePress={() => {
                    setMajorPage("FAQ");
                  }}
                  titleClassName="text-2xl font-bold"
                  isSelected={majorPage === "FAQ"}
                />
                <SelectableButton
                  className="w-36"
                  title="Contact Us"
                  handlePress={() => {
                    setMajorPage("CONTACT US");
                  }}
                  titleClassName="text-2xl font-bold"
                  isSelected={majorPage === "CONTACT US"}
                />
              </View>
              {majorPage === "FAQ" && (
                <View className="flex-row justify-around">
                  <SelectableButton
                    className="h-8"
                    title="Popular Topics"
                    handlePress={() => {
                      setFaqTopic("POPULAR");
                    }}
                    titleClassName="text-sm font-bold px-2"
                    isSelected={faqTopic === "POPULAR"}
                  />
                  <SelectableButton
                    className="h-8"
                    title="General"
                    handlePress={() => {
                      setFaqTopic("GENERAL");
                    }}
                    titleClassName="text-sm font-bold px-4"
                    isSelected={faqTopic === "GENERAL"}
                  />
                  <SelectableButton
                    className="h-8"
                    title="Services"
                    handlePress={() => {
                      setFaqTopic("SERVICES");
                    }}
                    titleClassName="text-sm font-bold px-4"
                    isSelected={faqTopic === "SERVICES"}
                  />
                </View>
              )}

              <View className="">
                {faqTopic === "POPULAR" && majorPage === "FAQ" && (
                  <PopularTopicsItems />
                )}
                {faqTopic === "GENERAL" && majorPage === "FAQ" && (
                  <GeneralTopicsItems />
                )}
                {faqTopic === "SERVICES" && majorPage === "FAQ" && (
                  <ServicesTopicsItems />
                )}

                {majorPage === "CONTACT US" && <ContactOptions />}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default SettingsScreen;

const PopularTopicsItems = () => {
  return (
    <View className="gap-y-6">
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
    </View>
  );
};
const GeneralTopicsItems = () => {
  return (
    <View className="gap-y-6">
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
    </View>
  );
};
const ServicesTopicsItems = () => {
  return (
    <View className="gap-y-6">
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Something"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
            ridiculus magna lacinia convallis egestas. Magna libero conubia duis
            vitae maximus imperdiet senectus."
      />
    </View>
  );
};

const ContactOptions = () => {
  return (
    <View className="gap-y-6">
      <DropdownItem
        title="Custom Service"
        icon="headset-outline"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
          ridiculus magna lacinia convallis egestas. Magna libero conubia duis
          vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Website"
        icon="globe-outline"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
          ridiculus magna lacinia convallis egestas. Magna libero conubia duis
          vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Whatsapp"
        icon="logo-whatsapp"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
          ridiculus magna lacinia convallis egestas. Magna libero conubia duis
          vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Facebook"
        icon="logo-facebook"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
          ridiculus magna lacinia convallis egestas. Magna libero conubia duis
          vitae maximus imperdiet senectus."
      />
      <DropdownItem
        title="Instagram"
        icon="logo-instagram"
        textContent="Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
          ridiculus magna lacinia convallis egestas. Magna libero conubia duis
          vitae maximus imperdiet senectus."
      />
    </View>
  );
};
