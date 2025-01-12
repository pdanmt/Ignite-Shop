import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
    return (
        <Box
            minH='565'
            m='0 auto'
            display='flex'
            flexDir='column'
            justifyContent='center'
            textAlign='center'
        >
            <Text fontSize='1.5rem'>Ops... Página não encontrada!</Text>
            <Text fontSize='2rem' color='white'>Error: 404</Text>
            <Text
                color='green500'
                _hover={{ color: 'green300' }}
                as={Link}
                href='/'
            >
                Voltar à página inicial
            </Text>
        </Box>
    )
}