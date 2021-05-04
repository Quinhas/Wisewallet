import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Tabs } from "../components/Tabs";
import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
        <Component {...pageProps}/>
      <Tabs/>
    </ChakraProvider>
  );
}

export default MyApp;
