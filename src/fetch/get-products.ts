import { stripe } from "@/lib/stripe";
import Stripe from "stripe"

export async function getProducts() {
  const dataProducts = await stripe.products.list({ expand: ['data.default_price'] })

  const products = dataProducts.data.map(({ images, name, description, id, default_price }) => {
    const price = default_price as Stripe.Price;
    const priceUnitAmount = price.unit_amount as number;
    const formatPrice = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(priceUnitAmount / 100)

    return {
      name,
      description,
      id,
      imageUrl: images[0],
      price: formatPrice,
      defaultPriceId: price.id
    };
  });

  return products;
}
