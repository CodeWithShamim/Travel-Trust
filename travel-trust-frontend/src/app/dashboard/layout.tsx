"use client";
import Loader from "@/components/ui/Loader";
import SideBar from "@/components/ui/SideBar";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData } from "@/redux/slices/userSlice";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <Layout hasSider className="min-h-screen w-full">
      <SideBar user={user} />
      <Content className="relative inset-x-auto left-[3%] md:left-[6%] lg:left-[10%] w-full">
        <div className="w-full max-w-[1200px] mx-auto h-[100%]">{children}</div>
      </Content>
    </Layout>
  );
};

export default DashboardLayout;
