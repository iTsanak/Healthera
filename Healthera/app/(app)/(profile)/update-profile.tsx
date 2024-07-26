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
import Avatar from "@/components/Profile/avatar";

type Props = {};

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid Email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dob: z.string().min(1, "Date of Birth is required"),
});

const ProfileScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";

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
            <SimpleTopNavBar title="Profile" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Avatar
                imageUri="https://utfs.io/f/e96b95ab-b00a-4801-bcc7-4946f71c11f2-cnxr61.jpeg"
                showBadge={true}
                size={128}
              />
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

export default ProfileScreen;
