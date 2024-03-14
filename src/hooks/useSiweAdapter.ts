import { useRouter } from 'next/navigation';
import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { SiweMessage } from 'siwe';

import useLoginStatus from '@/hooks/useLoginStatus';

const SIWE_STATEMENT = 'Welcome to ANT Service!';

const useSiweAdapter = () => {
  const { setLoginStatus } = useLoginStatus();
  const router = useRouter();

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const resp = await fetch('/api/siwe/nonce', {
        method: 'GET',
      });
      const { nonce } = await resp.json();

      return nonce;
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: SIWE_STATEMENT,
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => message.prepareMessage(),
    verify: async ({ message, signature }) => {
      setLoginStatus('loading');
      try {
        const resp = await fetch('/api/siwe/sign-in', {
          method: 'POST',
          body: JSON.stringify({ message, signature }),
        });

        if (resp.status === 201) {
          setLoginStatus('authenticated');
          router.refresh();
          return true;
        } else {
          setLoginStatus('unauthenticated');
          return false;
        }
      } catch (error) {
        setLoginStatus('unauthenticated');
        console.error(error);
        return false;
      }
    },
    signOut: async () => {
      await fetch('/api/siwe/sign-out', { method: 'POST' });
      setLoginStatus('unauthenticated');
      router.refresh();
    },
  });

  return { authAdapter };
};

export default useSiweAdapter;
