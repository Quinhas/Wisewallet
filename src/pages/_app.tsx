import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Tabs } from "../components/Tabs";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Wisewallet</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Tabs />
    </ChakraProvider>
  );
}

export default MyApp;
