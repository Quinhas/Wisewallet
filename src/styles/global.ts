import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { mediaQueries, scrollbar } from "./custom";

const theme = extendTheme({
  components: {
    MenuItem: {
      baseStyle: (props) => ({
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        height: "auto",
        px: "0.5rem",
        py: "0.7rem",
        grow: 1,
        width: "100%",
        borderRadius: "md",
        justifyContent: "flex-start",
        cursor: "pointer",
        color: mode("primaryApp.500", "primaryApp.200")(props),
        transition: "0.2s",
        _hover: {
          backgroundColor: mode("blackAlpha.200", "whiteAlpha.400")(props),
        },
        border: "1px solid",
        borderColor: "primaryApp.200",
      }),
      variants: {
        active: (props) => ({
          backgroundColor: "primaryApp.100",
          color: "primaryApp.900",
          _hover: {
            backgroundColor: "secondaryApp.100",
            color: "secondaryApp.900",
          },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      "#__next": {
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      },
      html: {
        fontSize: "87.5%",
      },
      a: {
        transition: "color 0.2s",
        color: "complementary.500",
        _hover: {
          color: "complementary.800",
        },
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        background: mode("blackAlpha.100", "blackAlpha.900")(props),
        color: mode("gray.800", "gray.100")(props),
      },
      "body, input, button, select, textarea": {
        fontFamily: "Montserrat, sans-serif",
      },
      ...mediaQueries,
      ...scrollbar,
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Poppins, sans-serif",
    mono: "Fira Mono, monospace",
  },
  colors: {
    primaryApp: {
      50: "#E8F3FD",
      100: "#BEDEF8",
      200: "#95C9F4",
      300: "#6CB4EF",
      400: "#429FEB",
      500: "#198AE6",
      600: "#146FB8",
      700: "#0F538A",
      800: "#0A375C",
      900: "#051C2E",
    },
    complementaryApp: {
      50: "#FFF5E5",
      100: "#FFE3B8",
      200: "#FFD18A",
      300: "#FFBF5C",
      400: "#FFAD2E",
      500: "#FF9B00",
      600: "#CC7C00",
      700: "#995D00",
      800: "#663E00",
      900: "#331F00",
    },
    success: {
      50: "#EAFAEE",
      100: "#C5F1D0",
      200: "#A0E8B1",
      300: "#7BE093",
      400: "#56D774",
      500: "#31CE56",
      600: "#27A545",
      700: "#1D7C33",
      800: "#145222",
      900: "#0A2911",
    },
    warning: {
      50: "#FFF6E6",
      100: "#FEE7B9",
      200: "#FDD78B",
      300: "#FDC85E",
      400: "#FCB831",
      500: "#FCA903",
      600: "#C98703",
      700: "#976502",
      800: "#654301",
      900: "#322201",
    },
    danger: {
      50: "#FBE9EA",
      100: "#F4C2C3",
      200: "#EE9B9D",
      300: "#E77477",
      400: "#E04D51",
      500: "#D9262A",
      600: "#AE1E22",
      700: "#821719",
      800: "#570F11",
      900: "#2B0808",
    },

    google: {
      50: "#FDEAE8",
      100: "#F8C3BE",
      200: "#F49C95",
      300: "#F0756B",
      400: "#EB4F42",
      500: "#E72818",
      600: "#B92013",
      700: "#8B180E",
      800: "#5C100A",
      900: "#2E0805",
    },

    gray: {
      50: "#F1F2F4",
      100: "#D7DBDF",
      200: "#BEC4CB",
      300: "#A5ADB6",
      400: "#8B96A2",
      500: "#727F8D",
      600: "#5B6671",
      700: "#444C55",
      800: "#2D3339",
      900: "#17191C",
    },
  },
});

export default theme;
