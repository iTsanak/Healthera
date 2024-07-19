import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  LayoutAnimation,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText, ThemedTextProps } from "../ThemedText";

export type FormTextFieldProps = ViewProps & {
  title: string;
  handleTextChange: (text: string) => void;
  titleClassName?: ThemedTextProps["className"];
  placeholder?: string;
  value?: string;
  isSecureText?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  isLoading?: boolean;
  onBlur?: () => void;
};

const FormTextField = forwardRef<TextInput, FormTextFieldProps>(
  function FormTextField(
    {
      title,
      handleTextChange,
      titleClassName,
      placeholder,
      value,
      isSecureText,
      keyboardType,
      isLoading,
      onBlur,
      style,
      ...rest
    },
    ref,
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const theme = useColorScheme() ?? "light";

    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput, [inputRef]);

    return (
      <View style={style} {...rest} className={isLoading ? "opacity-50" : ""}>
        <View className="flex-1">
          <View className="mx-2 pb-2">
            <ThemedText className={titleClassName}>{title}</ThemedText>
          </View>
          <View
            className={`${isFocused ? "bg-accent-light/60 dark:bg-accent-dark/70" : "bg-accent-light/20 dark:bg-accent-dark/20"} relative flex-1 rounded-xl`}
          >
            <View className="mx-2 flex-1 flex-row items-center">
              <TextInput
                placeholderTextColor={
                  theme === "dark" ? "#f1f1f1b0" : "#0f0f0f80"
                }
                placeholder={placeholder}
                ref={inputRef}
                className="flex-auto text-lg text-text-light dark:text-text-dark"
                keyboardType={keyboardType ?? "default"}
                value={value}
                numberOfLines={1}
                editable={!isLoading}
                onFocus={() => {
                  setIsFocused(true);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  if (onBlur) {
                    onBlur();
                  }
                }}
                onChangeText={(text) => {
                  handleTextChange(text);
                }}
                secureTextEntry={isSecureText ? !isPasswordVisible : false}
              ></TextInput>

              {isSecureText && (
                <TouchableOpacity
                  onPress={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                  }}
                  className={`ml-2 justify-center`}
                >
                  <Ionicons
                    name={`${isPasswordVisible ? "eye-off" : "eye"}`}
                    size={25}
                    color={theme === "dark" ? "white" : "black"}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* <View
          className={`${isFocused ? "bg-green-200" : "bg-yellow-200"} relative flex-1 rounded-xl`}
        >
          <View className="mx-2 flex-1 flex-row items-center">
            <View className={"absolute"}>
              <Text
                className={`${isFocused ? "text-primary-light" : "text-text-light/70 dark:text-text-dark/70"} text-lg`}
              >
                {title}
              </Text>
            </View>

            <TextInput
              ref={inputRef}
              className="flex-auto text-lg text-text-light dark:text-text-dark"
              keyboardType={keyboardType ?? "default"}
              value={value}
              numberOfLines={1}
              editable={!isLoading}
              onFocus={() => {
                setIsFocused(true);
                LayoutAnimation.easeInEaseOut();
              }}
              onBlur={(e) => {
                setIsFocused(false);
                LayoutAnimation.easeInEaseOut();
                if (onBlur) {
                  onBlur();
                }
              }}
              onChangeText={(text) => {
                handleTextChange(text);
              }}
              secureTextEntry={isSecureText ? !isPasswordVisible : false}
            ></TextInput>

            {isSecureText && (
              <TouchableOpacity
                onPress={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
                className={`ml-2 justify-center`}
              >
                <Ionicons
                  name={`${isPasswordVisible ? "eye-off" : "eye"}`}
                  size={30}
                  color={theme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View> */}
      </View>
    );
  },
);

export default FormTextField;
