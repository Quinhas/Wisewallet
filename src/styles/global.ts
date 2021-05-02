import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const global = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: mode("gray.50", "gray.900")(props),
      },

      "@media (min-width: 1361px) and (max-width: 1440px)": {
        html: {
          fontSize: "100%",
        },
      },

      "@media (max-width: 1360px)": {
        html: {
          fontSize: "85%",
        },
      },

      "@media (max-width: 1080px)": {
        html: {
          fontSize: "93.75%",
        },
      },

      "@media (max-width: 720px)": {
        html: {
          fontSize: "87.5%",
        },
      },
    }),
  },
});
