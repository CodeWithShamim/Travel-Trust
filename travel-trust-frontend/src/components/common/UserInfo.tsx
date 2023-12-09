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
  children: React.ReactNode;
}

const UserInfo = ({ children }: IUserInfoProps) => {
  const { id } = getUserInfo();
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if ((error as any)?.data?.message === "Jwt expired") {
    message.error((error as any)?.data?.message);
    SignOut({ router, dispatch });
  }

  useEffect(() => {
    dispatch(setUserLoading(isLoading));

    if (data?.id) {
      dispatch(setUserData(data));
      dispatch(setUserLoading(isLoading));
    }
  }, [data, dispatch, isLoading]);

  return <>{isLoading ? <Loader /> : children}</>;
};

export default UserInfo;
