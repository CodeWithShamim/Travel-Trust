"use client";

import { getUserInfo } from "@/helpers/persist/user.persist";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUserData, setUserLoading } from "@/redux/slices/userSlice";
import { message } from "antd";
import React, { useEffect } from "react";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { SignOut } from "@/utils/common";

interface IUserInfoProps {
  children?: React.ReactNode;
  isDashboard?: boolean;
}

const UserInfo = ({ children, isDashboard }: IUserInfoProps) => {
  const { id } = getUserInfo();

  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if ((error as any)?.data?.message === "jwt expired") {
    message.error((error as any)?.data?.message);
    SignOut({ router, dispatch });
  }

  useEffect(() => {
    dispatch(setUserLoading(isLoading));

    if (data?.id) {
      dispatch(setUserData(data));
      dispatch(setUserLoading(isLoading));
    }

    if (!data?.id && !isLoading && isDashboard) {
      router.push("/login");
    }
  }, [data, dispatch, isLoading, isDashboard, router]);

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 bg-transparent z-[99999]">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default UserInfo;
