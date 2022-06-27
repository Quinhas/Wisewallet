import { ChakraProvider } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Tabs from 'components/Tabs'
import { AuthContextProvider } from 'contexts/AuthContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import theme from 'styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  const dontRenderNavbarAndTabs = ['/login', '/signup'];
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Head>
          <title>Wisewallet</title>
        </Head>
        {!dontRenderNavbarAndTabs.includes(router.pathname) && <Navbar />}
        <Component {...pageProps} />
        {!dontRenderNavbarAndTabs.includes(router.pathname) && <Tabs />}
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
