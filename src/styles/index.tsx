import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        white: '#fff',

        gray900: '#121212',
        gray800: '#202024',
        gray300: '#c4c4cc',
        gray100: '#e1e1e6',

        green500: '#00875f',
        green300: '#00b37e',
    },
    styles: {
        global: {
            '*': {
                m: 0,
                p: 0,
            },

            body: {
                bg: 'gray900',
                color: 'gray100',
            },

            'body, input, button, textarea': {
                fontWeight: 400,
                color: 'gray100',
            }
        }
    },
    breakpoints: {
        base: '0em',
        sm: '500px',
        md: '850px',
        lg: '1200px',
        xl: '1800px',
        '2xl': '2400px',
    }
})