import { ProductBodyInCart } from "@/components/add-to-cart-button"

export function addProductToCart({ defaultPriceId, imageUrl, name, price, quantity }: ProductBodyInCart) {
    const oldStorage = localStorage.getItem('ignite-shop@1.0:cart')

    if (oldStorage === null) {
        localStorage.setItem(
            'ignite-shop@1.0:cart',
            JSON.stringify([{ defaultPriceId, imageUrl, price, name, quantity }])
        )
    } else {
        const storage: ProductBodyInCart[] = JSON.parse(oldStorage)


        if (storage.find((product) => product.defaultPriceId === defaultPriceId)) {
            const newStorage = storage.map((product) => {
                if (product.defaultPriceId === defaultPriceId) {
                    return {...product, quantity: product.quantity + 1}
                }

                return product
            })

            localStorage.setItem(
                'ignite-shop@1.0:cart',
                JSON.stringify(newStorage)
            )
        } else {
            localStorage.setItem(
                'ignite-shop@1.0:cart',
                JSON.stringify([...storage, { defaultPriceId, imageUrl, price, name, quantity }])
            )
        }
    }
}