import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { router } from "expo-router";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import SocialButton from "@/components/Button/social-sign-in-buttons";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { register, registerErrorCleared, selectAuthRegisterError, selectAuthStatus } from "@/redux/auth/auth-slice";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  password: z.string().min(1, "Password is required").min(8, "Password too short"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
});

const SignUpScreen = () => {
  const theme = useColorScheme() ?? "dark";

  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectAuthRegisterError);
  const registerStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    return () => {
      dispatch(registerErrorCleared());
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting || registerStatus === "pending";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("[SIGN_UP_SCREEN]: SUBMITTING SIGN UP FORM", values);
    try {
      await dispatch(
        register({
          email: values.email,
          firstName: values.first_name,
          password: values.password,
          lastName: values.last_name,
        }),
      ).unwrap();

      // Reset form and handle navigation after successful register
      form.reset();
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } catch (error) {
      console.log("[SIGN_UP_SCREEN]: REGISTER FAILED");
    }
  };

  return (
    <ThemedView className="flex-1">
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <SimpleTopNavBar title="New Account" />
          <View className="flex-1 items-center">
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View className="w-[80%]">
                {!!registerError && (
                  <View className="py-4">
                    <ThemedText className="text-center text-red-500">{registerError}</ThemedText>
                  </View>
                )}

                <Controller
                  control={form.control}
                  name="first_name"
                  disabled={isLoading}
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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

                <View className="mt-4 items-center">
                  <ThemedText className="text-xs">By continuing you agree to</ThemedText>
                  <AppPolicy />

                  <PrimaryButton
                    handlePress={form.handleSubmit((data: any) => onSubmit(data))}
                    title="Sign Up"
                    className="my-4 w-48"
                    isLoading={isLoading}
                  />

                  <ThemedText>or sign up with</ThemedText>
                  <SocialButtons />
                  <Footer />
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const AppPolicy = () => {
  return (
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
          router.push("/terms-and-conditions");
        }}
      >
        Privacy Policy
      </ThemedText>
    </ThemedText>
  );
};

const SocialButtons = () => {
  return (
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
  );
};

const Footer = () => {
  return (
    <View className="mb-10 mt-4 flex-row items-center">
      <ThemedText className="mx-2">already have an account?</ThemedText>
      <TouchableOpacity onPress={() => router.replace("/sign-in")}>
        <ThemedText className="font-bold text-green-600">Log in</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
