import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RedirectPathOnly from './Redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import Web3ReactManager from '../components/Web3ReactManager'
import Menu from '../components/Menu'
import Marketplace from './Market'

const cacheLanguage = 'lang'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(cacheLanguage)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, translatedLanguage, setTranslatedLanguage }}>
          <TranslationsContext.Provider value={{ translations, setTranslations }}>
            <Menu>
              <ToastContainer />
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path="/market" component={Marketplace} />
                  <Route component={RedirectPathOnly} />
                </Switch>
              </Web3ReactManager>
            </Menu>
          </TranslationsContext.Provider>
        </LanguageContext.Provider>
      </BrowserRouter>
    </Suspense>
  )
}
