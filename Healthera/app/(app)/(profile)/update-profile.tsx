import { View, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from "react-native";
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
import { useAppSelector } from "@/redux/redux-hooks";
import { selectUserFirstName, selectUserLastName, useChangeNameMutation } from "@/redux/auth/auth-slice";
import { router } from "expo-router";

type Props = {};

const formSchema = z.object({
  fist_name: z.string().min(1, "First Name is required"),
  last_name: z.string(),
});

const ProfileScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const firstName = useAppSelector(selectUserFirstName);
  const lastName = useAppSelector(selectUserLastName);

  const [uploadNewName, { isError, isLoading, isSuccess }] = useChangeNameMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fist_name: firstName ?? "",
      last_name: lastName ?? "",
    },
  });

  const aggIsLoading = form.formState.isSubmitting || isLoading;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("SUBMITTING UPDATE PROFILE FORM", values);
      await uploadNewName({ first_name: values.fist_name, last_name: values.last_name }).unwrap();
      form.reset();
      router.navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center">
            <SimpleTopNavBar title="Profile" />
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="w-full"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <Avatar size={128} />
              <View className="w-[80%]">
                <Controller
                  control={form.control}
                  name="fist_name"
                  disabled={aggIsLoading}
                  render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                    <FormTextField
                      title="First Name"
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
                  disabled={aggIsLoading}
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

                <View className="mb-10 mt-4 items-center">
                  <PrimaryButton
                    handlePress={form.handleSubmit((data: any) => onSubmit(data))}
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
