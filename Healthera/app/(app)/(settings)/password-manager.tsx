import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const formSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  newPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
  confirmPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password too short"),
});

const PasswordManagerScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING UPDATE PASSWORD FORM", values);
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
            <SimpleTopNavBar title="Password Manager" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <View className="w-[80%]">
                <Controller
                  control={form.control}
                  name="currentPassword"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Current Password"
                      placeholder="*******************"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-2"
                      error={error}
                      isSecureText={true}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="newPassword"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="New Password"
                      placeholder="*******************"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-2"
                      error={error}
                      isSecureText={true}
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name="confirmPassword"
                  disabled={isLoading}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <FormTextField
                      title="Confirm New Password"
                      placeholder="*******************"
                      handleTextChange={onChange}
                      value={value}
                      className="mt-2"
                      error={error}
                      isSecureText={true}
                    />
                  )}
                />

                <View className="mb-10 mt-4 items-center">
                  <PrimaryButton
                    handlePress={form.handleSubmit((data: any) =>
                      onSubmit(data),
                    )}
                    title="Change Password"
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

export default PasswordManagerScreen;
