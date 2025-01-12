'use client'

import { Box, Text } from "@chakra-ui/react";
import igniteLogo from "../../public/igniteLogo.svg"
import { Image } from "@chakra-ui/next-js";
import { CartDrawer } from "./cart-drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname()
    const isOnSuccessPage = pathname === '/success';

    return (
        <Box
            as="header"
            display='flex'
            justifyContent={isOnSuccessPage ? 'center' : 'space-between'}
            alignItems='center'
            w='100%'
            maxW='1100'
            m='0 auto'
            mb='3rem'
            p={['0 1rem', '0 1rem', '0']}
        >
            <Box
                display='flex'
                alignItems='center'
                gap='0.5rem'
                as={Link}
                href='/ '
            >
                <Image src={igniteLogo} alt="" w='42px' h='42px' />
                <Box>
                    <Text fontSize='1.3rem' color='white' fontWeight="bold" letterSpacing='1px'>
                        ignite
                    </Text>
                    <Text>shop</Text>
                </Box>
            </Box>
            {!isOnSuccessPage && (
                <Box
                bg='gray800'
                color='gray300'
                p='0.7rem'
                borderRadius="8px"
                cursor='pointer'
                transition='0.2s'
                _hover={{ filter: 'brightness(1.3)' }}
            >
                <CartDrawer />
            </Box>
            )}
        </Box>
    )
}