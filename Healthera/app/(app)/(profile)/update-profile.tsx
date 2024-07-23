import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";
import { useSession } from "@/providers/session-provider";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const ProfileScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const { signUp } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      dob: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  console.log("123wqadsfer32qwdrgwqedvfgrw4erds");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING UPDATE PROFILE FORM", values);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center">
            <SimpleTopNavBar title="New Account" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Avatar imageUri="https://utfs.io/f/e96b95ab-b00a-4801-bcc7-4946f71c11f2-cnxr61.jpeg" />
              <View className="w-[80%]">
                <Controller
                  control={form.control}
                  name="name"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Full Name"
                      placeholder="John Smith..."
                      handleTextChange={onChange}
                      value={value}
                      className="mt-2"
                      error={error}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="email"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Email"
                      placeholder="email@domain.com"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-4"
                      error={error}
                      keyboardType="email-address"
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="phoneNumber"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Mobile Number"
                      placeholder="123-123-1234"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-4"
                      error={error}
                      keyboardType="phone-pad"
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="dob"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Date Of Birth"
                      placeholder="DD/MM/YYYY"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-4"
                      error={error}
                      keyboardType="number-pad"
                    />
                  )}
                />

                <View className="mb-10 mt-4 items-center">
                  <PrimaryButton
                    handlePress={form.handleSubmit((data: any) =>
                      onSubmit(data),
                    )}
                    title="Update Profile"
                    className="my-4 w-48"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

import { Pressable, Image } from "react-native";
import IconTitleArrow from "@/components/SpecialButtons/icon-title-arrow";
import Avatar from "@/components/Profile/avatar";

const ProfileScreen1 = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
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
            <View className="my-5 w-full items-center justify-center">
              <View className="relative h-32 w-32">
                <Pressable
                  className="h-full w-full"
                  onPress={() => {
                    console.log("pressed IMAGE");
                  }}
                >
                  <Image
                    source={{
                      uri: "https://utfs.io/f/e96b95ab-b00a-4801-bcc7-4946f71c11f2-cnxr61.jpeg",
                    }}
                    className="h-full w-full rounded-full"
                    resizeMode="cover"
                  />
                </Pressable>
                <Pressable
                  style={{ backgroundColor: Colors[theme].primary }}
                  className="absolute bottom-1 right-1 rounded-full p-2"
                  onPress={() => {
                    console.log("pressed ICON");
                  }}
                >
                  <Ionicons
                    name="pencil-outline"
                    color={Colors[theme].text}
                    size={20}
                  />
                </Pressable>
              </View>
              <ThemedText className="mt-4 text-xl font-bold">NAME</ThemedText>
            </View>
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
                }}
              />
              <IconTitleArrow
                title="Settings"
                icon="settings"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Help"
                icon="help-outline"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
              <IconTitleArrow
                title="Logout"
                icon="log-out-outline"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default ProfileScreen;
