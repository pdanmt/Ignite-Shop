import { addProductToCart } from '@/utils/add-product-to-cart';
import { Box, Text } from '@chakra-ui/react';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

interface ProductImageProps {
    name: string
    price: string
    imageUrl: string
    id: string
    defaultPriceId: string
}

export function ProductImage({ name, price, imageUrl, id, defaultPriceId }: ProductImageProps) {
    function handleAddProductToCart() {
        addProductToCart({ name, price, imageUrl, defaultPriceId, quantity: 1 })

        toast.success('Produto adicionado ao carrinho!')
    }

    return (
        <Box
            w='100%'
            maxW={['90vw', '450px', '550px']}
            minW={['90vw', '450px', '550px']}
            h='550px'
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='center'
            bg='linear-gradient(#1EA483, #7465D4)'
            borderRadius='8px'
            pos='relative'
            overflow='hidden'
            _hover={{
                'footer': {
                    opacity: '90%',
                    transform: 'translateY(0%)'
                }
            }}
            className='keen-slider__slide'
        >
            <Link href={`/product/${id}`} prefetch={false}>
                <Box w={['450px', '550px']}>
                    <Image
                        width={520}
                        height={480}
                        src={imageUrl}
                        alt=''
                        objectFit='cover'
                        layout='responsive'
                    />
                </Box>
            </Link>
            <Box
                as='footer'
                pos='absolute'
                bottom='0'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                w='99%'
                bg='gray800'
                p='0.7rem'
                borderRadius='6px'
                m='3px'
                transform='translateY(110%)'
                opacity='0'
                transition='all 0.2s ease-in-out'
            >
                <Box>
                    <Text color='white'>{name}</Text>
                    <Text color='green300'>
                        {price}
                    </Text>
                </Box>
                <Box
                    bg='green500'
                    p='0.7rem'
                    borderRadius='6px'
                    _hover={{ transition: '0.2s', bg: 'green300' }}
                    cursor='pointer'
                >
                    <ShoppingCart color='white' size='1.2rem' onClick={handleAddProductToCart} />
                </Box>
            </Box>
        </Box>
    )
}