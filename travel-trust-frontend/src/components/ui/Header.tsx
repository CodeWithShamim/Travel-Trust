"use client";

import {
  Layout,
  Button,
  MenuProps,
  Dropdown,
  Space,
  Avatar,
  Badge,
  message,
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useAppDispatch, useAppSelector, useSocket } from "@/redux/hooks";
import { removeUserData, setUserData } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import {
  getValueFromLocalStorage,
  removeValueFromLocalStorage,
} from "@/utils/local-storage";
import { authKey, cartKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { addAllServiceToCart } from "@/redux/slices/serviceSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import Notification from "@/views/Notification";
import { INotification } from "@/types";
import { useGetAllNotificationQuery } from "@/redux/api/notificationApi";
import { headerItems } from "@/constants/commons";

const { Header: HeaderLayout } = Layout;

const Header = () => {
  const { id } = getUserInfo();
  const { data, isLoading, error } = useGetUserByIdQuery(id);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const { data: data2, isLoading: isLoading2 } =
    useGetAllNotificationQuery(null);

  const dispatch: any = useAppDispatch();

  const [notifications, setNotifications] = useState<INotification[]>([]);

  const [showNotification, setShowNotification] = useState<boolean>(false);

  const userData = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();

  const socket = useSocket();

  const cart = useAppSelector((state) => state.service?.cart);

  const playSound = () => {
    audioRef?.current?.play();
  };

  // notification received by socket
  useEffect(() => {
    if (socket) {
      socket.on("notification:service", (notificaion: any) => {
        playSound();
        setNotifications((prev) => [notificaion, ...prev]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const newNotification = data2?.notifications as INotification[];
    newNotification?.length > 0 && setNotifications(newNotification);
  }, [data2]);

  // get cart value from local storage
  useEffect(() => {
    const cartValue = getValueFromLocalStorage(cartKey);
    const parseCartValue = JSON.parse(cartValue as string);

    if (parseCartValue?.length) {
      dispatch(addAllServiceToCart(parseCartValue));
    }

    if (data?.id) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  const signOut = () => {
    removeValueFromLocalStorage(authKey);
    dispatch(removeUserData());
    router.push("/login");
  };

  if ((error as any)?.data?.message === "Jwt expired") {
    message.error((error as any)?.data?.message);
    signOut();
  }

  return (
    <HeaderLayout className="z-[999999] shadow-md bg-transparent w-full px-4">
      {showNotification && (
        <Notification
          data={notifications}
          onClose={setShowNotification}
          isLoading={isLoading2}
        />
      )}

      <audio ref={audioRef} src={"/notifacation.wav"}></audio>

      <motion.div className=" max-w-[1200px] mx-auto text-white w-full flex items-center justify-between h-full">
        <Link
          href="/"
          className="text-xl md:text-2xl lg:text-3xl font-extrabold shadow-2xl uppercase text-[#09ea4c] z-50"
        >
          Travel Trust
        </Link>

        <div className="flex gap-2 items-center z-50">
          <Link href="/service/search" className="pt-2">
            <AiOutlineSearch size={24} className="text-[#09ea4c]" />
          </Link>

          <Badge count={notifications?.length} className="mr-4 cursor-pointer">
            <Avatar
              onClick={() => setShowNotification(true)}
              icon={<IoMdNotifications size={16} className="text-[#09ea4c]" />}
            />
          </Badge>

          <Link href="/dashboard/profile">
            <Badge count={cart?.length} className="mr-4">
              <Avatar
                icon={
                  <BsFillCartCheckFill size={16} className="text-[#09ea4c]" />
                }
              />
            </Badge>
          </Link>

          <Link href="/message" className="hidden md:block">
            <Button
              type="link"
              className="text-xs md:text-sm"
              // icon={<AiFillMessage size={20} className="text-green-400 pt-2" />}
            >
              <span className="font-bold text-green-400 tracking-wide">
                Message
              </span>
            </Button>
          </Link>

          <Link href="/dashboard/profile" className="hidden md:block">
            <Button type="default" className="text-xs md:text-sm">
              Dashboard
            </Button>
          </Link>

          <Dropdown
            menu={{ items: headerItems({ userData, isLoading, signOut }) }}
            className="z-50 cursor-pointer"
          >
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
