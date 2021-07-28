import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "src/styles/global";
import React, { useEffect } from "react";
import { Tabs } from "@components/Tabs";
import { Navbar } from "@components/Navbar";
import { AuthContextProvider } from "@contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Head>
          <title>Wisewallet</title>
        </Head>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
}
export default MyApp;
