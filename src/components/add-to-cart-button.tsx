'use client'

import { addProductToCart } from "@/utils/add-product-to-cart";
import { Button } from "@chakra-ui/react";
import { toast } from "sonner";

export interface ProductBodyInCart {
    name: string;
    imageUrl: string;
    price: string;
    defaultPriceId: string;
    quantity: number
}


export function AddToCartButton({ productToAdd }: { productToAdd: ProductBodyInCart }) {
    const { defaultPriceId, imageUrl, name, price, quantity } = productToAdd

    function handleAddProductToCart() {
        addProductToCart({ defaultPriceId, imageUrl, name, price, quantity })

        toast.success('Produto adicionado ao carrinho!')
    }

    return (
        <Button
            bg="green300"
            color="gray100"
            p="1.5rem 0"
            _hover={{ bg: 'green500', color: 'white' }}
            onClick={handleAddProductToCart}
        >
            Colocar no carrinho
        </Button>
    );
}