'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { Box } from "@chakra-ui/react";
import { ProductImage } from "./product-img";

export interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  defaultPriceId: string
}

interface HomeProps {
  products: Product[]
}

export function Products({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 48,
    }
  })

  return (
    <Box
      as='main'
      display='flex'
      alignItems='center'
      w='100%'
      maxW='calc(100vw - ((100vw - 1100px) / 2))'
      ml='auto'
      ref={sliderRef}
      className='keen-slider'
    >
      {products.map(({ id, imageUrl, name, price, defaultPriceId }) => (
        <ProductImage
          imageUrl={imageUrl}
          name={name}
          price={price}
          key={id}
          id={id}
          defaultPriceId={defaultPriceId}

        />
      ))}
    </Box>
  )
}