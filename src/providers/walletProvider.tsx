'use client';

import { FC, PropsWithChildren } from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import {
  RainbowKitSiweNextAuthProvider,
  type GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

const SIWE_STATEMENT = 'Welcome to MEMECORE Service!';
const SIWE_VERSION = '1';

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const getSiweMessageOptions: GetSiweMessageOptions = () => {
    return {
      domain: window.location.host,
      statement: SIWE_STATEMENT,
      uri: window.location.origin,
      version: SIWE_VERSION,
    };
  };
  return (
    <RainbowKitSiweNextAuthProvider
      getSiweMessageOptions={getSiweMessageOptions}
    >
      <RainbowKitProvider
        locale='en'
        theme={darkTheme({ borderRadius: 'none' })}
        modalSize='compact'
      >
        {children}
      </RainbowKitProvider>
    </RainbowKitSiweNextAuthProvider>
  );
};

export default WalletProvider;
