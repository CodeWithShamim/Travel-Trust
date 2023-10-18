import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
        <body>
          <Header />
          <div className="min-h-screen mx-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
