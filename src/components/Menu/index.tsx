import React, { useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()

  const { login, logout } = useAuth()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()

  return <div>123123</div>
}

export default Menu
