import { View, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import FormTextField from "@/components/Auth/form-text-field";
import PrimaryButton from "@/components/Button/primary-button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/redux/auth/auth-slice";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

type Props = {};

const formSchema = z.object({
  newPassword: z.string().min(1, "Password is required").min(8, "Password too short"),
  confirmPassword: z.string().min(1, "Password is required").min(8, "Password too short"),
});

const PasswordManagerScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [error, setError] = useState("");

  const [uploadNewPassword, { isError, isLoading, isSuccess }] = useChangePasswordMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const aggIsLoading = form.formState.isSubmitting || isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING UPDATE PASSWORD FORM", values);
      if (values.confirmPassword !== values.newPassword) {
        setError("Passwords do not match");
        return null;
      }
      setError("");
      await uploadNewPassword({ new_password1: values.newPassword, new_password2: values.confirmPassword }).unwrap();
      form.reset();
      router.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
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
                {!!error && (
                  <View className="py-4">
                    <ThemedText className="text-center text-red-500">{error}</ThemedText>
                  </View>
                )}

                <Controller
                  control={form.control}
                  name="newPassword"
                  disabled={aggIsLoading}
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                  disabled={aggIsLoading}
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
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
                    handlePress={form.handleSubmit((data: any) => onSubmit(data))}
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
