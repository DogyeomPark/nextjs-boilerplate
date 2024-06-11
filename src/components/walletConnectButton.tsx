'use client';

import { FC, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useConnectWallet from '@/hooks/useConnectWallet';

import '@rainbow-me/rainbowkit/styles.css';

const WalletConnectButton: FC = () => {
  const router = useRouter();
  const { data: user } = useSession();
  const { openConnectModal, disconnectAsync, isConnected, openAccountModal } =
    useConnectWallet();

  const onClickConnect = async () => {
    await disconnectAsync();
    openConnectModal?.();
  };

  useEffect(() => {
    router.refresh();
  }, [isConnected]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, authenticationStatus, mounted, openChainModal }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated') &&
          user?.id;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={onClickConnect} type='button'>
                    Sign in
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type='button'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type='button'
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type='button'>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnectButton;
