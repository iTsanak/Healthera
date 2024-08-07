import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
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
import { parse, isValid, format } from "date-fns";
import {
  CHECK_EMAIL_URL,
  CheckEmailRequestData,
  CheckEmailResponseData,
} from "@/API/check-email";
import axios from "axios";
import {
  REGISTER_URL,
  RegisterRequestData,
  RegisterResponseData,
} from "@/API/register";

type Props = {};

// Regex for phone number validation
const phoneRegex = /^\+?1?\d{9,15}$/;

// Date format validation function
const dateValidator = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
  // phoneNumber: z
  //   .string()
  //   .min(1, "Phone number is required")
  //   .regex(
  //     phoneRegex,
  //     "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
  //   ),
  // dob: z
  //   .string()
  //   .min(1, "Date of Birth is required")
  //   .refine((value) => {
  //     const parsedDate = parse(value, "yyyy-MM-dd", new Date());
  //     return isValid(parsedDate);
  //   }, "Invalid date format. Use yyyy-MM-dd")
  //   .transform((value) => {
  //     const parsedDate = parse(value, "yyyy-MM-dd", new Date());
  //     return format(parsedDate, "yyyy-MM-dd");
  //   }),
});

const SignUpScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const { register, getDeviceId } = useSession();
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
      // phoneNumber: "",
      // dob: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const checkIfEmailIsAvailable = async (email: string) => {
    const requestData: CheckEmailRequestData = {
      email: email,
    };

    const response: CheckEmailResponseData = (
      await axios.post(CHECK_EMAIL_URL, requestData)
    ).data;

    if (response.code !== "AVAILABLE" && response.code !== "IN_USE") {
      console.log(
        "[SIGN_UP_SCREEN]: CHECK EMAIL ERROR, response.code is invalid",
      );
    }

    return response.code === "AVAILABLE";
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // TODO phone number format and date format are not easy for users
    values.email = values.email.toLowerCase().trim();
    try {
      console.log("[SIGN_UP_SCREEN]: SUBMITTING SIGN UP FORM", values);
      setRegisterErrorMessage("");

      if (!(await checkIfEmailIsAvailable(values.email))) {
        setRegisterErrorMessage("Email already registered");
        return;
      }

      const device_id = await getDeviceId();

      const requestData: RegisterRequestData = {
        email: values.email,
        password1: values.password,
        password2: values.password,
        device_id: device_id,
      };

      const response: RegisterResponseData = (
        await axios.post(REGISTER_URL, requestData)
      ).data;

      await register(response);

      form.reset();
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } catch (error) {
      setRegisterErrorMessage("Username is already taken.");
      console.log("[SIGN_UP_SCREEN]:", error);
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
              <View className="w-[80%]">
                {!!registerErrorMessage && (
                  <View className="py-4">
                    <ThemedText className="text-center text-red-500">
                      {registerErrorMessage}
                    </ThemedText>
                  </View>
                )}

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
                {/* <Controller
                  control={form.control}
                  name="phoneNumber"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Mobile Number"
                      placeholder="+1 123 123 1234"
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
                    />
                  )}
                /> */}

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
