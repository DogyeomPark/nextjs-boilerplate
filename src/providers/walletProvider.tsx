'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

import useLoginStatus from '@/hooks/useLoginStatus';
import useSiweAdapter from '@/hooks/useSiweAdapter';

import { AUTH_TOKEN_KEY, type AuthToken } from '@/config';

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();
  const { loginStatus, setLoginStatus } = useLoginStatus();
  const { authAdapter } = useSiweAdapter();

  useEffect(() => {
    const accessToken = getCookie(AUTH_TOKEN_KEY);
    if (!accessToken) {
      setLoginStatus('unauthenticated');
      return;
    }

    const decodedJwt = jwt.decode(accessToken) as AuthToken;

    if (decodedJwt?.walletAddress && decodedJwt.walletAddress === address) {
      setLoginStatus('authenticated');
      return;
    }

    setLoginStatus('unauthenticated');
  }, [address, loginStatus, setLoginStatus]);

  return (
    <RainbowKitAuthenticationProvider
      adapter={authAdapter}
      status={loginStatus}
    >
      <RainbowKitProvider theme={darkTheme()} modalSize='compact'>
        {children}
      </RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};

export default WalletProvider;
