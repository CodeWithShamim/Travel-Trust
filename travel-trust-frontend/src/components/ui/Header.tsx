"use client";

import { Layout, Button, MenuProps, Dropdown, Space, Avatar } from "antd";
import Link from "next/link";
import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
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
const items: MenuProps["items"] = [];

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

  return (
    <HeaderLayout className="px-4 md:px-24 lg:px-32 text-white flex items-center justify-between">
      <div className="md:text-xl">
        <Link href="/" className="text-primary font-bold">
          Travel Trust
        </Link>
      </div>

      {/* dropdoan list  for tablet & desktop*/}
      <Dropdown menu={{ items }} className="hidden md:flex">
        <Space className="font-medium hover:cursor-pointer">
          Categories
          <DownOutlined />
        </Space>
      </Dropdown>

      <div className="flex gap-2 items-center">
        {/* for tablet & desktop */}
        <Link href="/tool/pc-builder" className="hidden md:block">
          <Button type="primary" className="text-xs md:text-sm">
            PC Builder
          </Button>
        </Link>

        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar
                src={userData?.profileImage}
                size="large"
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Space>
          </a>
        </Dropdown>

        {/* login / logout button  */}
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
      </div>
    </HeaderLayout>
  );
};

export default Header;
