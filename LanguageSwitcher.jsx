import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher(){
  const { i18n } = useTranslation()
  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  }
  return (
    <button onClick={toggle} className='border px-3 py-1 rounded'>
      {i18n.language === 'ar' ? 'EN' : 'ع'}
    </button>
  )
}
