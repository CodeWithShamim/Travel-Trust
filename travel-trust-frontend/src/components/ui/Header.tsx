"use client";

import { Layout, Button, MenuProps, Dropdown, Space, Avatar } from "antd";
import Link from "next/link";
import React from "react";
import {
  DownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUserData, setUserData } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { removeTokenFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";

const { Header: HeaderLayout } = Layout;

const Header = () => {
  const { id } = getUserInfo();
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();

  useEffect(() => {
    if (data?.id) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  const signOut = () => {
    removeTokenFromLocalStorage(authKey);
    dispatch(removeUserData());
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: 1,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: 1,
      label: (
        <>
          {userData?.id ? (
            <Button
              onClick={() => signOut()}
              type="primary"
              className="bg-primary text-xs md:text-sm"
              loading={isLoading}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button
                type="primary"
                className="bg-primary text-xs md:text-sm"
                loading={isLoading}
              >
                Signin
              </Button>
            </Link>
          )}
        </>
      ),
    },
  ];

  return (
    <HeaderLayout className="z-[999999] shadow-md sticky px-4 md:px-24 lg:px-32 bg-transparent text-white flex items-center justify-between">
      <div className="md:text-xl">
        <Link
          href="/"
          className="text-xl md:text-2xl lg:text-3xl font-extrabold shadow-2xl uppercase text-[#09ea4c]"
        >
          Travel Trust
        </Link>
      </div>

      <div></div>

      <div className="flex gap-2 items-center">
        {/* for tablet & desktop */}
        <Link href="/dashboard/profile" className="hidden md:block">
          <ShoppingCartOutlined
            height={100}
            width={100}
            className="text-[#09ea4c] font-bold text-4xl"
          />
        </Link>

        <Link href="/dashboard/profile" className="hidden md:block">
          <Button type="default" className="text-xs md:text-sm">
            Dashboard
          </Button>
        </Link>

        <Dropdown menu={{ items }} className="z-50">
          <Space wrap size={16}>
            <Avatar
              src={userData?.profileImage}
              size="large"
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Space>
        </Dropdown>
      </div>
    </HeaderLayout>
  );
};

export default Header;
