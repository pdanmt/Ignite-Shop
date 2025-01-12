import { getProducts } from "@/fetch/get-products"

import { Products } from "@/components/products"

export const dynamic = 'force-static'

export const revalidate = 3600

export default async function Home() {
  const products = await getProducts()

  return (
    <Products products={products} />
  )
}