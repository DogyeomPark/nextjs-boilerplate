import { SessionProvider } from 'next-auth/react';
import { Nunito } from 'next/font/google';

import './globals.css';
import styles from './layout.module.css';

import getCurrentUser from '@/actions/getCurrentUser';
import ToasterProvider from '@/providers/ToasterProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modals/LoginModal';
import RegisterModal from '@/components/modals/RegisterModal';
import RentModal from '@/components/modals/RentModal';
import SearchModal from '@/components/modals/SearchModal';
import initTranslations from '../i18n';
import TranslationsProvider from '@/providers/TranslationProvider';

const font = Nunito({ subsets: ['latin'] });

const i18nNamespaces = ['common', 'modal'];

export const metadata = {
  title: 'Boilerplate',
  description: 'Memecore boilerplate',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: 'en' | 'ko' };
}) {
  const currentUser = await getCurrentUser();

  const { lang } = params;
  const { resources } = await initTranslations(lang, i18nNamespaces);

  return (
    <html lang='en'>
      <body className={font.className}>
        <SessionProvider>
          <ReactQueryProvider>
            <TranslationsProvider
              lang={lang}
              namespaces={i18nNamespaces}
              resources={resources}
            >
              <LoginModal />
              <RegisterModal />
              <RentModal />
              <SearchModal />
              <ToasterProvider />
              <Navbar />
              <div className={styles.container}>{children}</div>
            </TranslationsProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
