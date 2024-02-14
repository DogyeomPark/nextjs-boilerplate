'use client';

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance, Resource } from 'i18next';

import initTranslations from '@/app/i18n';

interface TranslationProviderProps {
  children: ReactNode,
  lang: string,
  namespaces: string[],
  resources: Resource
}

const TranslationsProvider: React.FC<TranslationProviderProps> = ({
  children,
  lang,
  namespaces,
  resources
})=> {
  const i18n = createInstance();

  initTranslations(lang, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider