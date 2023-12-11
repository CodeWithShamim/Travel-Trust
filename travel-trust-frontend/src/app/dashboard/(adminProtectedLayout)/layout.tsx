"use client";
import Loader from "@/components/ui/Loader";
import { USER_ROLE } from "@/constants/role";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading } = useAppSelector((state) => state.user);
  const user: any = data;

  useEffect(() => {
    if (user?.role === USER_ROLE.USER && !isLoading) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  if (!isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminLayout;
