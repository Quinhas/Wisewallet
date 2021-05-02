import { extendTheme } from "@chakra-ui/react";
import { global } from './global';
import { colors } from './colors';

const theme = extendTheme({
  ...global,
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Poppins, sans-serif",
  },
  colors
},);

export default theme;
