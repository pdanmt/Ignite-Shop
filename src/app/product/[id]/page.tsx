import { AddToCartButton } from "@/components/add-to-cart-button";
import { LinearGradientBgProductImage } from "@/components/linear-gradient-bg-product-img";
import { stripe } from "@/lib/stripe";
import { Box, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import Stripe from "stripe";

export const metadata: Metadata = {
    title: 'Produto'
}

export const revalidate = 3600

export async function generateStaticParams() {
    const dataProducts = await stripe.products.list()
    const products = dataProducts.data.map(({ id }) => id)

    return products.map((id) => ({
        id
    }))
}

async function getProductInfos(id: string) {
    const product = await stripe.products.retrieve(id, { expand: ['default_price'] })

    const price = product.default_price as Stripe.Price;
    const priceUnitAmount = price.unit_amount as number;
    const formatPrice = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(priceUnitAmount / 100)

    return {
        name: product.name,
        description: product.description,
        productId: product.id,
        imageUrl: product.images[0],
        price: formatPrice,
        defaultPriceId: price.id
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const productInfos = await getProductInfos(id)

    return (
        <Box
            display='flex'
            flexDir={['column', 'column', 'row']}
            w='100%'
            maxW='1100'
            m='0 auto'
            gap='2rem'
            alignItems={['center', 'center', 'normal']}
        >
            <LinearGradientBgProductImage
                imgW={520}
                imgH={480}
                src={productInfos.imageUrl}
                alt=""
                boxH={['435', '450', '515']}
                boxW={['90vw', '95vw', '515']}
            />
            <Box
                w={['90vw', '90vw', '520px']}
                display='flex'
                flexDir='column'
                justifyContent='space-between'
                m='0 auto'
            >
                <Box>
                    <Text
                        as='h1'
                        fontSize='1.5rem'
                        fontWeight='bold'
                        letterSpacing='1px'
                    >
                        {productInfos.name}
                    </Text>
                    <Text
                        fontSize='1.2rem'
                        color='green300'
                        p={['0 0 1rem', '1.5rem 0 2.5rem', '1.5rem 0 2.5rem']}
                    >
                        {productInfos.price}
                    </Text>
                    <Text color='gray300' lineHeight={1.6} pb='1rem'>
                        {productInfos.description}
                    </Text>
                </Box>
                <AddToCartButton productToAdd={{ ...productInfos, quantity: 1 }} />
            </Box>
        </Box>
    )
}