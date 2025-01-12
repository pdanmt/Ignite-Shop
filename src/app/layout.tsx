import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ChakraProviders } from "./providers";
import { Header } from "../components/header";
import { Box } from "@chakra-ui/react";
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: "Catálogo | Ignite Shop",
    template: '%s | Ignite Shop'
  },
  description: "Loja de venda de produtos",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className}`}>
        <ChakraProviders>
          <Toaster richColors />
          <Box
            p='3rem 0'
            display='flex'
            flexDir='column'
            alignItems='flex-start'
            justifyContent='center'
            minH='100vh'
          >
            <Header />
            {children}
          </Box>
        </ChakraProviders>
      </body>
    </html>
  );
}
