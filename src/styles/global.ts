import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const global = extendTheme({
  styles: {
    global: (props) => ({
      html: {
        fontSize: '87.5%'
      },
      body: {
        backgroundColor: mode("gray.50", "gray.900")(props),
      },

    }),
  },
});
