"use client";
import Loader from "@/components/ui/Loader";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = getUserInfo();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userLoggedIn?.role === USER_ROLE.USER) {
      router.push("/");
    }
    setIsLoading(true);
  }, [userLoggedIn, router, isLoading]);

  if (!isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AdminLayout;
