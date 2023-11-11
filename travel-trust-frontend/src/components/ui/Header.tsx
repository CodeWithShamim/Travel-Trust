"use client";

import {
  Layout,
  Button,
  MenuProps,
  Dropdown,
  Space,
  Avatar,
  Badge,
} from "antd";
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
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";

const { Header: HeaderLayout } = Layout;

const Header = () => {
  const { id } = getUserInfo();
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const dispatch: any = useAppDispatch();
  const userData = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();
  const cart = useAppSelector((state) => state.service?.cart);

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
      label: <Link href="/dashboard/profile">Dashboard</Link>,
    },
    {
      key: 2,
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: 3,
      label: <Link href="/service/search">Search</Link>,
    },
    {
      key: 4,
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
    <HeaderLayout className="z-[999999] shadow-md bg-transparent w-full px-4">
      <motion.div className=" max-w-[1200px] mx-auto text-white w-full flex items-center justify-between h-full">
        <div className="md:text-xl">
          <Link
            href="/"
            className="text-xl md:text-2xl lg:text-3xl font-extrabold shadow-2xl uppercase text-[#09ea4c]"
          >
            Travel Trust
          </Link>
        </div>

        <div className="flex gap-2 items-center z-50">
          {/* for tablet & desktop */}
          <Link href="/dashboard/profile" className="hidden md:block">
            <Badge count={cart?.length} className="mr-4">
              <Avatar
                icon={
                  <BsFillCartCheckFill size={16} className="text-[#09ea4c]" />
                }
              />
            </Badge>
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
      </motion.div>
    </HeaderLayout>
  );
};

export default Header;
