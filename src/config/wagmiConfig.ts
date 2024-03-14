import { http, fallback, createConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const getProjectId = () => {
  return process.env.NEXT_PUBLIC_PROJECT_ID ?? 'YOUR_PROJECT_ID';
};

export const config = createConfig({
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: fallback([http()]), // array of json-rpc endpoint. ex http('https://eth-mainnet.g.alchemy...')
    [goerli.id]: fallback([http()]),
  },
  connectors: [injected({ target: 'metaMask' })],
  ssr: true,
});
