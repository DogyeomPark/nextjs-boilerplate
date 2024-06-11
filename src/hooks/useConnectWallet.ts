import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useSession } from 'next-auth/react';
import { useAccount, useDisconnect } from 'wagmi';

const useConnectWallet = () => {
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { openAccountModal, accountModalOpen } = useAccountModal();
  const { disconnect, disconnectAsync } = useDisconnect();

  const { isConnected: isWalletConnected } = useAccount();
  const { data } = useSession();
  const isConnected = isWalletConnected && !!data?.id;

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
