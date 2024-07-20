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
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const SignUpScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const { signUp } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      phoneNumber: "",
      dob: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  console.log("123wqadsfer32qwdrgwqedvfgrw4erds");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING SIGN UP FORM", values);
      form.reset();
      signUp(values);
      router.dismissAll();
      router.replace("/");
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
            <SimpleTopNavBar />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
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
                  name="password"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Password"
                      placeholder="*****"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-4"
                      error={error}
                      isSecureText={true}
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

                <View className="mt-4 items-center">
                  <ThemedText className="text-xs">
                    By continuing you agree to
                  </ThemedText>
                  <ThemedText className="text-xs">
                    <ThemedText
                      className="text-xs text-secondary-light dark:text-secondary-dark"
                      onPress={() => {
                        console.log("pressed");
                      }}
                    >
                      Terms of Use
                    </ThemedText>{" "}
                    and{" "}
                    <ThemedText
                      className="text-xs text-secondary-light dark:text-secondary-dark"
                      onPress={() => {
                        console.log("pressed");
                      }}
                    >
                      Privacy Policy
                    </ThemedText>
                  </ThemedText>

                  <PrimaryButton
                    handlePress={form.handleSubmit((data: any) =>
                      onSubmit(data),
                    )}
                    title="Sign Up"
                    className="my-4 w-48"
                  />

                  <ThemedText>or sign up with</ThemedText>

                  <View className="mt-2 flex-row gap-x-2">
                    <View className="overflow-hidden rounded-full">
                      <TouchableOpacity
                        className="bg-secondary-light p-2 dark:bg-secondary-dark"
                        onPress={() => {
                          console.log("Pressed");
                        }}
                      >
                        <Ionicons
                          name="logo-google"
                          size={30}
                          color={Colors[theme].background}
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="overflow-hidden rounded-full">
                      <TouchableOpacity
                        className="bg-secondary-light p-2 dark:bg-secondary-dark"
                        onPress={() => {
                          console.log("Pressed");
                        }}
                      >
                        <Ionicons
                          name="logo-facebook"
                          size={30}
                          color={Colors[theme].background}
                        />
                      </TouchableOpacity>
                    </View>
                    <View className="overflow-hidden rounded-full">
                      <TouchableOpacity
                        className="bg-secondary-light p-2 dark:bg-secondary-dark"
                        onPress={() => {
                          console.log("Pressed");
                        }}
                      >
                        <Ionicons
                          name="finger-print"
                          size={30}
                          color={Colors[theme].background}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <ThemedText className="mb-10 mt-4">
                    already have an account?{" "}
                    <ThemedText
                      className="text-secondary-light dark:text-secondary-dark"
                      onPress={() => {
                        console.log("pressed");
                      }}
                    >
                      Log in
                    </ThemedText>
                  </ThemedText>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignUpScreen;
