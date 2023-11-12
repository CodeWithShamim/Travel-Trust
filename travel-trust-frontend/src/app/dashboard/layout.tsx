"use client";
import Loader from "@/components/ui/Loader";
import SideBar from "@/components/ui/SideBar";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = getUserInfo();
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userLoggedIn?.id);

  useEffect(() => {
    if (!user?.id && !isLoading) {
      router.push("/login");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout hasSider className="min-h-screen w-full">
      <SideBar />
      <div className="p-4 w-full max-w-[1200px] mx-auto h-[100%]">
        {children}
      </div>
    </Layout>
  );
};

export default DashboardLayout;
