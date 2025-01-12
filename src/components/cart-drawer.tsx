'use client'

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Text,
    useDisclosure
}
    from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { ProductInCart } from "./product-in-cart";
import { useEffect, useState } from "react";
import { ProductBodyInCart } from "./add-to-cart-button";
import { toast } from "sonner";

export function CartDrawer() {
    const [productsInCart, setProductsInCart] = useState<ProductBodyInCart[]>([])
    const [totalValue, setTotalValue] = useState<number>(0)
    const [totalQuantity, setTotalQuantity] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const { isOpen, onClose, onOpen } = useDisclosure()

    function handleClickFn() {
        const storage = localStorage.getItem('ignite-shop@1.0:cart')

        if (storage !== null) {
            const productsStorage: ProductBodyInCart[] = JSON.parse(storage)

            setProductsInCart(productsStorage)
        }

        onOpen()
    }

    useEffect(() => {
        setTotalValue(0)
        setTotalQuantity(0)

        productsInCart.forEach(({ price, quantity }) => {
            const value = Number(price.slice(3, price.length).replace(',', '.')) * quantity

            setTotalValue((prev) => prev + value)
            setTotalQuantity((prev) => prev + quantity)
        })
    }, [productsInCart])

    async function finalizePurchace() {
        const items = productsInCart.map(({ defaultPriceId, quantity }) => ({
            priceId: defaultPriceId,
            quantity: quantity,
        }))

        try {
            setLoading(true)

            const response = await fetch(
                'http://localhost:3000/api',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items })
                }
            )

            if (!response.ok) {
                toast.error('Algo deu errado ao finalizar a compra. Tente novamente.')

                throw new Error('Erro ao criar a sessão de checkout.')
            }

            setLoading(false)

            const { url } = await response.json()
            if (url) {
                window.location.href = url
            } else {
                toast.error('A url do checkout não foi retornada. Tente novamente.')

                throw new Error('A url do checkout não foi retornada.')
            }
        } catch (error) {
            console.error(`Um erro ocorreu durante a requisição do checkout de sessão. Erro: ${error}`)
            toast.error('Algo deu errado ao finalizar a compra. Tente novamente.')
        }
    }

    return (
        <>
            <ShoppingCart
                color='white'
                size='1.2rem'
                onClick={() => handleClickFn()}
            />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size='sm'>
                <DrawerOverlay />
                <DrawerContent bg='gray800' p='2rem 0'>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize='1.2rem'>
                        Sacola de compras
                    </DrawerHeader>
                    <DrawerBody display='flex' flexDir='column' gap='1.2rem'>
                        {productsInCart.length === 0
                            ? (
                                <Text textAlign='center'>
                                    O seu carinho está vazio... Adicione alguns produtos!
                                </Text>
                            )
                            :
                            productsInCart.map((product) => (
                                <ProductInCart
                                    key={product.defaultPriceId}
                                    product={product}
                                    setProductsInCart={setProductsInCart}
                                />
                            ))
                        }
                    </DrawerBody>
                    <DrawerFooter display='flex' flexDir='column' gap='2rem'>
                        <Box w='100%'>
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Text>Quantidade</Text>
                                <Text>{totalQuantity} ite{totalQuantity !== 1 ? 'ns' : 'm'}</Text>
                            </Box>
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                color='white'
                                fontSize='1.2rem'
                            >
                                <Text>Valor total</Text>
                                <Text>
                                    {Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(totalValue)}
                                </Text>
                            </Box>
                        </Box>
                        <Button
                            bg="green300"
                            color="gray100"
                            p="1.5rem 0"
                            _hover={{ bg: 'green500', color: 'white' }}
                            w='100%'
                            onClick={finalizePurchace}
                            isDisabled={loading}
                        >
                            {!loading ? 'Finalizar compra' : 'Carregando...'}
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}