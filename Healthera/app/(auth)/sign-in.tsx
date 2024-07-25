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
import { useSession } from "@/providers/session-provider";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialButton from "@/components/Button/social-sign-in-buttons";

type Props = {};

const formSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
});

const SignInScreen = (props: Props) => {
  const { signIn } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING SIGN IN FORM", values);
      form.reset();
      signIn(values);
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
          <SimpleTopNavBar title="Log in" />
          <View className="flex-1 px-[10%]">
            <ThemedText className="mb-8 mt-5 text-left text-2xl font-bold">
              Welcome
            </ThemedText>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex-1"
              keyboardShouldPersistTaps="handled"
            >
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
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
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
                onPress={() => router.replace("/forgot-password")}
                className="mt-1 self-end"
              >
                <ThemedText className="text-sm text-green-500">
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>
              <View className="items-center">
                <PrimaryButton
                  handlePress={form.handleSubmit((data: any) => onSubmit(data))}
                  title="Log in"
                  className="mb-5 mt-10 w-48"
                />
                <ThemedText className="mb-3">or sign in with</ThemedText>

                <View className="mb-7 flex-row justify-center">
                  <View className="mx-2">
                    <SocialButton
                      iconName="google"
                      onPress={() => {
                        /* Handle Google sign-up */
                      }}
                    />
                  </View>
                  <View className="mx-2">
                    <SocialButton
                      iconName="facebook"
                      onPress={() => {
                        /* Handle Facebook sign-up */
                      }}
                    />
                  </View>
                  <View className="mx-2">
                    <SocialButton
                      iconName="fingerprint"
                      onPress={() => {
                        /* Handle biometric sign-up */
                      }}
                    />
                  </View>
                </View>
                <View className="flex-row items-center">
                  <ThemedText className="mx-2">
                    Don't have an account?
                  </ThemedText>
                  <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                    <ThemedText className="font-bold text-green-600">
                      Sign Up
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SignInScreen;
