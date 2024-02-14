'use client'

import { ChangeEvent } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import i18nConfig from '../../../i18n.config'

interface LanguageSelectorProps {

}


const LanguageSelector: React.FC<LanguageSelectorProps> = ({ }) => {
  const router = useRouter()
  const pathname = usePathname()

  const { i18n } = useTranslation()
  const currLanguage = i18n.language

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value

    // set cookie of expiration for next-i18n-router
    const exp = 30 * 24 * 60 * 60 * 1000; // 30 days
    const date = new Date()
    date.setTime(date.getTime() + exp)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLanguage};expires=${expires};path=/`

    // redirect to the new locale path
    if (
      currLanguage === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLanguage + pathname);
    } else {
      router.push(
        pathname.replace(`/${currLanguage}`, `/${newLanguage}`)
      );
    }

    router.refresh();

  }
  return <select onChange={handleChange} value={currLanguage}>
    <option value='en'>English</option>
    <option value='ko'>한국어</option>
  </select>
}


export default LanguageSelector;