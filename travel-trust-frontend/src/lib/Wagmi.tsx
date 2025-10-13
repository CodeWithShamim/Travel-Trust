'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  getDefaultConfig,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { defineChain } from 'viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const zamaTestnet = defineChain({
  id: 8009,
  name: 'Zama FHE Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.zama.ai'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zama.ai' },
  },
})

export const config = getDefaultConfig({
  appName: 'Travel Trust',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!, // Get this from https://cloud.walletconnect.com
  chains: [sepolia, zamaTestnet],
  ssr: true,
})

const queryClient = new QueryClient()

export function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#FFD20A',
            accentColorForeground: 'black',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
