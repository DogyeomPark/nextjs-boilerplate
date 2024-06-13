import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAccount, useDisconnect, useAccountEffect } from 'wagmi';

const useConnectWallet = () => {
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { openAccountModal, accountModalOpen } = useAccountModal();
  const { disconnect, disconnectAsync } = useDisconnect();

  const { isConnected: isWalletConnected } = useAccount();
  const router = useRouter();
  const { data } = useSession();
  const isConnected = isWalletConnected && !!data?.id;

  useAccountEffect({
    onDisconnect: async () => {
      await fetch('/api/siwe/sign-out', { method: 'POST' });
      await signOut({ redirect: false });
      router.replace('/');
    },
  });

  return {
    isConnected,
    openConnectModal,
    connectModalOpen,
    openAccountModal,
    accountModalOpen,
    disconnect,
    disconnectAsync,
  };
};

export default useConnectWallet;
