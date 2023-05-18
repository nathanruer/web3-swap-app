'use client';

import './globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from 'next/font/google'

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli, polygon, arbitrum, optimism, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { Chain } from 'wagmi/chains';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const localhostChain: Chain = {
  id: 31337,
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
    public: {
      http: ['https://localhost:8545'],
    },
  },
  testnet: false,
};
const { chains, provider } = configureChains(
  [mainnet, goerli, polygon, arbitrum, optimism, avalanche, localhostChain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Web3Modal Connect Wallet',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Swap App',
  description: 'By Nathan Ruer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}
      bg-zinc-800 text-white`}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider 
            chains={chains}
            theme={lightTheme({
              accentColor: '#E2E2E2',
              accentColorForeground: 'black',
            })}
          >
            <Navbar />
            {children}
            <Footer />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
