import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";
import DateTime from "@/components/common/DateTime";

export const metadata: Metadata = {
  title: "Travel Trust",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DateTime />
      <Header />
      <div className="min-h-screen mx-auto">{children}</div>
      <Footer />
    </>
  );
}
