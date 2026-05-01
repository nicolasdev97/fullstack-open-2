import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const theme = {
  colors: {
    light: {
      text: "#11181C",
      background: "#fff",
      tint: tintColorLight,
      icon: "#687076",
      tabIconDefault: "#687076",
      tabIconSelected: tintColorLight,
    },
    dark: {
      text: "#ECEDEE",
      background: "#151718",
      tint: tintColorDark,
      icon: "#9BA1A6",
      tabIconDefault: "#9BA1A6",
      tabIconSelected: tintColorDark,
    },
  },

  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
};

export default theme;
