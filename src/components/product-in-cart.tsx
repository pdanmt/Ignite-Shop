import { Box, Text } from "@chakra-ui/react";
import { LinearGradientBgProductImage } from "./linear-gradient-bg-product-img";
import { ProductBodyInCart } from "./add-to-cart-button";
import { Dispatch, SetStateAction } from "react";

interface ProductInCartProps {
    product: ProductBodyInCart
    setProductsInCart: Dispatch<SetStateAction<ProductBodyInCart[]>>
}

export function ProductInCart({ product, setProductsInCart }: ProductInCartProps) {
    function removeItemFromCart() {
        const storage = localStorage.getItem('ignite-shop@1.0:cart')

        if (storage !== null) {
            const productsStorage: ProductBodyInCart[] = JSON.parse(storage)
            const findChangedProduct = productsStorage.find(({ defaultPriceId }) => product.defaultPriceId === defaultPriceId)

            if (findChangedProduct?.quantity === 1 || !findChangedProduct) {
                const newStorage = productsStorage.filter((item) => item.defaultPriceId !== product.defaultPriceId)

                localStorage.setItem('ignite-shop@1.0:cart', JSON.stringify(newStorage))

                setProductsInCart(newStorage)
            } else {
                const productsNotChanged = productsStorage.filter((item) => item.defaultPriceId !== product.defaultPriceId)
                const newStorage: ProductBodyInCart[] = [
                    ...productsNotChanged,
                    { ...findChangedProduct, quantity: findChangedProduct.quantity - 1 }
                ]

                localStorage.setItem('ignite-shop@1.0:cart', JSON.stringify(newStorage))

                setProductsInCart(newStorage)
            }
        }
    }

    return <Box display='flex' gap='1rem'>
        <LinearGradientBgProductImage
            imgW={250}
            imgH={230}
            src={product.imageUrl}
            alt=""
            boxH={93}
            boxW={102}
        />
        <Box display='flex' flexDir='column' justifyContent='space-between'>
            <Text color='gray300'>{product.name}{product.quantity > 1 ? ` x ${product.quantity}` : ''}</Text>
            <Text color='white'>{product.price}</Text>
            <Text
                color='green500'
                fontWeight='bold'
                cursor='pointer'
                onClick={removeItemFromCart}
                userSelect='none'
                transition='0.15s'
                _hover={{ color: 'green300' }}
            >
                Remover
            </Text>
        </Box>
    </Box>
}