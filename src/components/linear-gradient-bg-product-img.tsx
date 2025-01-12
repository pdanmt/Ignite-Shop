import { Image } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";

interface ImageAndBoxProps {
    imgW: number | `${number}`
    imgH: number | `${number}`
    src: string
    alt: string
    boxW: number | `${number}` | string[]
    boxH: number | `${number}` | string[]
}

export function LinearGradientBgProductImage({ imgW, imgH, src, alt, boxW, boxH }: ImageAndBoxProps) {
    return <Box
        w='100%'
        maxW={boxW}
        h={boxH}
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
        bg='linear-gradient(#1EA483, #7465D4)'
        borderRadius='8px'
    >
        <Image
            objectFit="cover"
            alt={alt}
            width={imgW}
            height={imgH}
            src={src}
        />
    </Box>
}