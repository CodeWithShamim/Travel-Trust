import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";
import UserInfo from "@/components/common/UserInfo";

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
      <Header />
      <div className="min-h-screen mx-auto">{children}</div>
      <Footer />
    </>
  );
}
