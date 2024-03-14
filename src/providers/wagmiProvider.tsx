'use client';

import { FC, PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';

import { config } from '@/config';

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
};

export default Web3Provider;
