import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import ResetCSS from './ResetCSS'
import GlobalStyle from './style/Global'
import App from './pages/App'
import Providers from './Providers'
import 'inter-ui'
import 'antd/dist/antd.css'
import './i18n'

if ('ethereum' in window) (window.ethereum as any).autoRefreshOnNetworkChange = false

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <StrictMode>
    <Providers>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
