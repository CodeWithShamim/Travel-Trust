import Providers from "@/lib/Providers";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";
import ProgressBar from "@/components/common/ProgressBar";

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
        <ProgressBar />
        <body>
          <Header />
          <div className="min-h-screen mx-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
