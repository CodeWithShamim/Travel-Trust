"use client";
import Loader from "@/components/ui/Loader";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = getUserInfo();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn?.id) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [userLoggedIn, router, isLoading]);

  if (!isLoading) {
    return <Loader />;
  }

  return <Layout hasSider>{children}</Layout>;
};

export default DashboardLayout;
