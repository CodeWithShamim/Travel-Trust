'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function WalletConnect() {
  return <ConnectButton showBalance={{
    smallScreen: false,
    largeScreen: true,
  }} chainStatus="icon" />
}
