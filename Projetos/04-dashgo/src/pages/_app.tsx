import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SidebarDrawerContextProvider } from '../contexts/SidebarDrawerContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerContextProvider>
        <Component {...pageProps} />
      </SidebarDrawerContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
