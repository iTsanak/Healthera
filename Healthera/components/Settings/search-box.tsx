import { View, Pressable, TextInput, useColorScheme } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  handleSearch: (query: string) => void;
};

const SearchBox = ({ handleSearch }: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View className="w-full items-center justify-center">
      <View className="my-8 h-12 w-[95%] rounded-full" style={{ backgroundColor: Colors["dark"].text }}>
        <Pressable
          onPress={async () => {
            console.log("Search Pressed");
          }}
          className="flex-1 flex-row items-center px-4"
        >
          <Ionicons size={20} name="search" color={Colors["dark"].background} />
          <TextInput
            style={{ color: Colors["dark"].background }}
            className="ml-2 h-full flex-1"
            placeholder="Search..."
            placeholderTextColor={Colors["dark"].background + "99"}
            numberOfLines={1}
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBox;
