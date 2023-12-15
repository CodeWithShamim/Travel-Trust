"use client";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import { useAppSelector } from "@/redux/hooks";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "chart.js/auto";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import BottomBar from "@/components/ui/BottomBar";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const { Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAppSelector((state) => state.user);
  const user: any = data;

  const router = useRouter();

  useEffect(() => {
    if (!user?.id && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  return (
    <>
      <Header />
      <Layout hasSider className="min-h-screen w-full">
        {/* for tablet & desktop */}
        <SideBar user={user} />

        {/* for mobile  */}
        <BottomBar user={user} />

        <Content className="relative p-4 inset-x-0 ">
          <div className="w-full max-w-[1200px] mx-auto h-[100%]">
            {children}
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;
