// eslint-disable-next-line import/no-unresolved
import { AppTheme } from 'theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends AppTheme {}
}
