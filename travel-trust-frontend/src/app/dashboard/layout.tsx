"use client";
import Header from "@/components/ui/Header";
import Loader from "@/components/ui/Loader";
import SideBar from "@/components/ui/SideBar";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData } from "@/redux/slices/userSlice";
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
  const userLoggedIn = getUserInfo();
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userLoggedIn?.id);

  const dispatch: any = useAppDispatch();

  useEffect(() => {
    if (!user?.id && !isLoading) {
      router.push("/login");
    }

    if (user?.id) {
      dispatch(setUserData(user));
    }
  }, [user, router, isLoading, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Layout hasSider className="min-h-screen w-full">
        <SideBar user={user} />

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
