import { LinearGradientBgProductImage } from "@/components/linear-gradient-bg-product-img";
import { stripe } from "@/lib/stripe";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import Stripe from "stripe";
import NotFound from "../not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Sucesso na compra!'
}

interface searchParamsProps {
    searchParams: Promise<{session_id: string}>
}

export default async function SuccessfulPurchase({ searchParams }: searchParamsProps) {
    const sessionId = (await searchParams).session_id

    if (!sessionId) {
        return <NotFound />
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId,
        { expand: ['line_items', 'line_items.data.price.product'] }
    )

    const clientName = session.customer_details?.name || 'Cliente'

    var totalQuantity = 0

    session.line_items?.data.forEach(({ quantity }) => {
        if (quantity) {
            totalQuantity = totalQuantity + quantity
        }
    })

    const productImgUrls = session.line_items?.data.map(({ price }) => {
        const product = price?.product as Stripe.Product

        return product.images[0]
    })

    return (
        <Box
            maxW='50vw'
            minH='565'
            display='flex'
            flexDir='column'
            justifyContent='center'
            textAlign='center'
            m='0 auto'
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexWrap='wrap'
                gap='2rem'
            >
                {productImgUrls?.map((imageUrl) => (
                    <LinearGradientBgProductImage
                    alt=""
                    boxH={140}
                    boxW={140}
                    imgH={200}
                    imgW={220}
                    src={imageUrl}
                />
                ))}
            </Box>
            <Text fontSize='2rem' p='2rem 0'>Compra efetuada!</Text>
            <Text fontSize='1.3rem' maxW='65%' m='0 auto'>
                Uhuul <strong>{clientName}</strong>, sua compra de <strong>{totalQuantity} camisetas</strong> já está a caminho da sua casa.
            </Text>
            <Text
                color='green500'
                cursor='pointer'
                _hover={{ color: 'green300' }}
                as={Link}
                href='/'
                pt='3rem'
            >
                Voltar ao catálogo
            </Text>
        </Box>
    )
}