import Providers from "@/lib/Providers";
import "antd/dist/reset.css";
import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { WagmiWrapper } from "@/lib/Wagmi";
import { Suspense } from "react";
const ProgressBar = dynamic(() => import("@/components/common/ProgressBar"));
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Travel Trust Agency Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className="relative inset-0">
          <Suspense>
            <ProgressBar />
            {/* <UserInfo /> */}
            <WagmiWrapper>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-50">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                  <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
                </div>
              </div>
              <div className="min-h-screen mx-auto">{children}</div>
            </WagmiWrapper>

            <Toaster />
          </Suspense>
        </body>
      </html>
    </Providers>
  );
}
