import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: local('Poppins'), url('../fonts/Poppins/Poppins-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'DM Sans';
    src: local('DM Sans'), url('../fonts/DM_Sans/DMSans-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Hanson';
    src: local('Hanson'), url('../fonts/Hanson/Hanson-Bold.ttf') format('truetype');
  }

  body {
    img {
      height: auto;
      max-width: 100%;

      // image-rendering: -moz-crisp-edges;
      // image-rendering: -o-crisp-edges;
      // image-rendering: -webkit-optimize-contrast;
      // image-rendering: crisp-edges;
      // -ms-interpolation-mode: nearest-neighbor;
    }
  }
`

export default GlobalStyle
