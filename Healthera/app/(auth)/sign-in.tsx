import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React, { useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";
import SocialButton from "@/components/Button/social-sign-in-buttons";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { login, loginErrorCleared, selectAuthLoginError, selectAuthStatus } from "@/redux/auth/auth-slice";

const formSchema = z.object({
  password: z.string().min(1, "Password is required").min(8, "Password too short"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
});

const SignInScreen = () => {
  const theme = useColorScheme() ?? "dark";

  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectAuthStatus);
  const loginError = useAppSelector(selectAuthLoginError);

  useEffect(() => {
    return () => {
      dispatch(loginErrorCleared());
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting || loginStatus === "pending";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("[SIGN_IN_SCREEN]: SUBMITTING SIGN IN FORM", values);

    try {
      await dispatch(login({ email: values.email, password: values.password })).unwrap();

      // Reset form and handle navigation after successful login
      form.reset();
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace("/");
    } catch (error) {
      console.log("[SIGN_IN_SCREEN]: LOGIN FAILED");
    }
  };

  return (
    <ThemedView className="flex-1">
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <SimpleTopNavBar title="Log in" />
          <View className="flex-1 px-[10%]">
            <ThemedText className="mb-8 mt-5 text-left text-2xl font-bold">Welcome</ThemedText>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1" keyboardShouldPersistTaps="handled">
              {!!loginError && (
                <View className="py-4">
                  <ThemedText className="text-center text-red-500">{loginError}</ThemedText>
                </View>
              )}

              <Controller
                control={form.control}
                name="email"
                disabled={isLoading}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <FormTextField
                    title="Email"
                    placeholder="example@domain.com"
                    handleTextChange={onChange}
                    value={value}
                    className="my-2"
                    error={error}
                    keyboardType="email-address"
                  />
                )}
              />

              <Controller
                control={form.control}
                name="password"
                disabled={isLoading}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <FormTextField
                    title="Password"
                    placeholder="*********"
                    handleTextChange={onChange}
                    value={value}
                    className="my-2"
                    error={error}
                    isSecureText={true}
                  />
                )}
              />

              <TouchableOpacity
                onPress={() => console.log(`[SIGN_IN_SCREEN] TODO: router.replace("/forgot-password")`)}
                className="mt-1 self-end"
              >
                <ThemedText className="text-sm text-green-500">Forgot Password?</ThemedText>
              </TouchableOpacity>

              <View className="items-center">
                <PrimaryButton
                  handlePress={form.handleSubmit((data: any) => onSubmit(data))}
                  title="Log in"
                  className="mb-5 mt-10 w-48"
                />

                <ThemedText className="mb-3">or sign in with</ThemedText>
                <SocialButtons />
                <Footer />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const SocialButtons = () => {
  return (
    <View className="mb-7 flex-row justify-center">
      <View className="mx-2">
        <SocialButton
          iconName="logo-google"
          onPress={() => {
            /* Handle Google sign-up */
          }}
        />
      </View>
      <View className="mx-2">
        <SocialButton
          iconName="logo-facebook"
          onPress={() => {
            /* Handle Facebook sign-up */
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
    <View className="flex-row items-center">
      <ThemedText className="mx-2">Don't have an account?</ThemedText>
      <TouchableOpacity onPress={() => router.replace("/sign-up")}>
        <ThemedText className="font-bold text-green-600">Sign Up</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
