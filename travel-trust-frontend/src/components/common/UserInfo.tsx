"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setUserData, setUserLoading } from "@/redux/slices/userSlice";
import { message } from "antd";
import React, { useEffect } from "react";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import { SignOut } from "@/utils/common";
import { useGetMeQuery } from "@/redux/api/authApi";
import { authKey } from "@/constants/storageKey";
import { getValueFromLocalStorage } from "@/utils/local-storage";
import { setDictionaries } from "@/redux/slices/i18nSlice";

interface IUserInfoProps {
  children?: React.ReactNode;
  dict: any;
}

const UserInfo = ({ children, dict }: IUserInfoProps) => {
  const accessToken = getValueFromLocalStorage(authKey);

  const { data, isLoading, error } = useGetMeQuery(accessToken);
  const dispatch = useAppDispatch();
  const router = useRouter();

  if ((error as any)?.data?.message === "jwt expired") {
    message.error((error as any)?.data?.message);
    SignOut({ router, dispatch });
  }

  useEffect(() => {
    dispatch(setDictionaries(dict));
    dispatch(setUserLoading(isLoading));

    if (data?.id) {
      dispatch(setUserData(data));
      dispatch(setUserLoading(isLoading));
    }
  }, [data, dispatch, isLoading, router, dict]);

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 z-[99999]">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default UserInfo;
