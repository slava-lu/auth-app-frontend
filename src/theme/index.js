import { extendTheme, Editable, withDefaultColorScheme } from '@chakra-ui/react'
import { theme as proTheme } from '@chakra-ui/pro-theme'
import components from './components'
import fonts from './foundation/fonts'
import styles from './globalStyles'

const myTheme = {
  components,
  styles,
  fonts,
  colors: { ...proTheme.colors, brand: proTheme.colors.teal },
}

Editable.defaultProps = { ...Editable.defaultProps, selectAllOnFocus: false, isPreviewFocusable: false }

export default extendTheme(myTheme, withDefaultColorScheme({ colorScheme: 'brand' }), proTheme)
