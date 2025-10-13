import Providers from '@/lib/Providers'
import 'antd/dist/reset.css'
import './globals.css'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { WagmiWrapper } from '@/lib/Wagmi'
import { Suspense } from 'react'
const ProgressBar = dynamic(() => import('@/components/common/ProgressBar'))

export const metadata: Metadata = {
  title: 'Travel Trust Agency Website',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <html lang="en">
        <body className="relative inset-0">
          <Suspense>
            <ProgressBar />
            {/* <UserInfo /> */}
            <WagmiWrapper>
              <div className="min-h-screen mx-auto">{children}</div>
            </WagmiWrapper>
          </Suspense>
        </body>
      </html>
    </Providers>
  )
}
