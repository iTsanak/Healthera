import {
  View,
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
import {
  CHECK_EMAIL_ENDPOINT,
  CheckEmailRequestData,
  CheckEmailResponseData,
} from "@/API/check-email";
import {
  REGISTER_ENDPOINT,
  RegisterRequestData,
  RegisterResponseData,
} from "@/API/register";
import SocialButton from "@/components/Button/social-sign-in-buttons";
import { StatusBar } from "expo-status-bar";
import { useAPI } from "@/providers/api-provider";
import logAxiosError from "@/lib/axios-better-errors";

// import { parse, isValid, format } from "date-fns";

type Props = {};

// Regex for phone number validation
const phoneRegex = /^\+?1?\d{9,15}$/;

// Date format validation function
const dateValidator = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime());
};

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
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
  const { api } = useAPI();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
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
      await api.post(CHECK_EMAIL_ENDPOINT, requestData)
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
        first_name: values.first_name,
        last_name: values.last_name,
      };

      const response: RegisterResponseData = (
        await api.post(REGISTER_ENDPOINT, requestData)
      ).data;

      await register(response);

      form.reset();
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } catch (error) {
      setRegisterErrorMessage("Email is already taken.");
      logAxiosError(error, "[SIGN_UP_SCREEN]: SUBMITTING");
    }
  };

  return (
    <ThemedView className="flex-1">
      <StatusBar style={theme === "light" ? "dark" : "light"} />

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
                  name="first_name"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="First Name *"
                      placeholder="John"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-2"
                      error={error}
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="last_name"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Last Name"
                      placeholder="Smith"
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
                      title="Password *"
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
                      title="Email *"
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
                        router.push("/privacy-policy");
                      }}
                    >
                      Terms of Use
                    </ThemedText>{" "}
                    and{" "}
                    <ThemedText
                      className="text-xs text-secondary-light dark:text-secondary-dark"
                      onPress={() => {
                        router.push("/privacy-policy");
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
                    <View className="mx-2">
                      <SocialButton
                        iconName="logo-google"
                        onPress={() => {
                          /* Handle biometric sign-up */
                        }}
                      />
                    </View>
                    <View className="mx-2">
                      <SocialButton
                        iconName="logo-facebook"
                        onPress={() => {
                          /* Handle biometric sign-up */
                        }}
                      />
                    </View>
                    <View className="mx-2">
                      <SocialButton
                        iconName="finger-print"
                        onPress={() => {
                          /* Handle biometric sign-up */
                        }}
                      />
                    </View>
                  </View>

                  <View className="mb-10 mt-4 flex-row items-center">
                    <ThemedText className="mx-2">
                      already have an account?
                    </ThemedText>
                    <TouchableOpacity
                      onPress={() => router.replace("/sign-in")}
                    >
                      <ThemedText className="font-bold text-green-600">
                        Log in
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
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
