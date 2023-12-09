import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import UserInfo from "@/components/common/UserInfo";
const ProgressBar = dynamic(() => import("@/components/common/ProgressBar"));

export const metadata: Metadata = {
  title: "Travel Trust Agency Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className="relative inset-0">
          <ProgressBar />
          <div className="min-h-screen mx-auto">{children}</div>
        </body>
      </html>
    </Providers>
  );
}
