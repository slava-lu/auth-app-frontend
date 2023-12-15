import { defineStyleConfig } from '@chakra-ui/react'

const style = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    outline: {
      borderBottom: '1px solid lightgray',
      _placeholder: {
        color: 'red',
      },
      input: {
        _focus: {
          bg: 'blackAlpha.50',
        },
        _focusVisible: 'none',
        marginBottom: '1px',
      },
      textarea: {
        _focus: {
          boxShadow: '0px 0px 0px 1px #38B2AC',
        },
      },
      preview: {
        minH: '33px',
        borderBottom: '1px solid lightgray',
        borderRadius: 'none',
        _placeholder: {
          color: 'red',
        },
      },
    },
  },
  defaultProps: {
    size: '',
    variant: 'outline',
    colorScheme: '',
  },
})

export default style
