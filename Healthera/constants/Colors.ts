/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#0f0f0f",
    background: "#f1f1f1",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#b4e193",
    secondary: "#4b8820",
    accent: "#77d733",
  },
  dark: {
    text: "#f1f1f1",
    background: "#0f0f0f",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#3e6c1e",
    secondary: "#a2df77",
    accent: "#6dcc28",
  },
};
