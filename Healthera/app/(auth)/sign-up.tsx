import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center">
            <SimpleTopNavBar />
            <ScrollView
              className="w-[80%] flex-1"
              keyboardShouldPersistTaps="handled"
            >
              <FormTextField
                title="Full Name"
                placeholder="John Smith..."
                handleTextChange={() => {}}
                className="my-4 h-20"
              />
              <FormTextField
                title="Password"
                placeholder="*****"
                handleTextChange={() => {}}
                isSecureText={true}
                className="mb-4 h-20"
              />
              <FormTextField
                title="Email"
                placeholder="email@domain.com"
                handleTextChange={() => {}}
                className="mb-4 h-20"
                keyboardType="email-address"
              />
              <FormTextField
                title="Mobile Number"
                placeholder="123-123-1234"
                handleTextChange={() => {}}
                className="mb-4 h-20"
                keyboardType="phone-pad"
              />
              <FormTextField
                title="Date Of Birth"
                placeholder="DD/MM/YYYY"
                handleTextChange={() => {}}
                className="mb-8 h-20"
                keyboardType="number-pad"
              />

              <View className="items-center">
                <ThemedText>By continuing you agree to</ThemedText>
                <ThemedText>Terms of Use and Privacy Policy</ThemedText>

                <PrimaryButton
                  handlePress={() => {
                    console.log("pressed");
                  }}
                  title="Sign Up"
                  className="mt-4 w-48"
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUp;
