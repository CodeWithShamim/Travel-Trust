import Providers from '@/lib/Providers';
import 'antd/dist/reset.css';
import './globals.css';
// import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { WagmiWrapper } from '@/lib/Wagmi';
import { Suspense } from 'react';
const ProgressBar = dynamic(() => import('@/components/common/ProgressBar'));
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { Metadata } from 'next';
import FhScript from '@/components/common/FhScript';

export const metadata: Metadata = {
  title: 'Travel Trust Agency Website',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en">
        <body className="relative inset-0">
          <Suspense>
            {/* <UserInfo /> */}
            <WagmiWrapper>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-50">
                  <div className="absolute top-0.5 left-1/6 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                  <div className="absolute top-3/4 left-1/4 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 right-20 w-72 h-72 bg-[#FFD20A] rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                </div>
              </div>
              <div className="min-h-screen mx-auto">{children}</div>
            </WagmiWrapper>
            <Toaster />
          </Suspense>

          <FhScript />

          <ProgressBar />
        </body>
      </html>
    </Providers>
  );
}
