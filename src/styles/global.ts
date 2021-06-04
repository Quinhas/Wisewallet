import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const global = extendTheme({
  styles: {
    global: (props) => ({
      html: {
        fontSize: "87.5%",
      },
      body: {
        backgroundColor: mode("gray.50", "gray.900")(props),
      },
      "*::-webkit-scrollbar": {
        width: "0.875rem",
        height: "0.875rem"
      },
      "*::-webkit-scrollbar-track": {
        background: "gray.50",
      },
      "*::-webkit-scrollbar-thumb": {
        background: "gray.100",
        borderRadius: "0px",
        border: "0px",
        "&:hover": {
          background: "gray.200",
        },
        "&:active": {
          background: "gray.500",
        },
      },
    }),
  },
});
