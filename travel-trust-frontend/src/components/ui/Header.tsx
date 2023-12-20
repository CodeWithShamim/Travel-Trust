"use client";

import { Layout, Button, Dropdown, Space, Avatar, Badge, Select } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector, useSocket } from "@/redux/hooks";

import { useEffect } from "react";
import { getValueFromLocalStorage } from "@/utils/local-storage";
import { cartKey } from "@/constants/storageKey";
import { BsFillCartCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { addAllServiceToCart } from "@/redux/slices/serviceSlice";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import Notification from "@/views/Notification";
import { INotification } from "@/types";
import { useGetAllNotificationQuery } from "@/redux/api/notificationApi";
import { headerItems } from "@/constants/commons";
import { useRouter } from "next/navigation";
import { SignOut } from "@/utils/common";
import DateTime from "../common/DateTime";
import { FaPlane } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";

const { Header: HeaderLayout } = Layout;

const Header = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const dispatch: any = useAppDispatch();

  const [notifications, setNotifications] = useState<INotification[]>([]);

  const [showNotification, setShowNotification] = useState<boolean>(false);

  const data = useAppSelector((state) => state.user?.data) as any;

  const { data: data2, isLoading: isLoading2 } = useGetAllNotificationQuery(
    {
      userId: data?.id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const router = useRouter();

  const socket = useSocket();

  const cart = useAppSelector((state) => state.service?.cart);

  const playSound = () => {
    audioRef?.current?.play();
  };

  // notification received by socket
  useEffect(() => {
    if (socket) {
      socket.on("notification", (notificaion: any) => {
        playSound();
        setNotifications((prev) => [notificaion, ...prev]);
      });
    }
  }, [socket]);

  // set initial notifications
  useEffect(() => {
    const newNotification = data2?.notifications as INotification[];
    newNotification?.length > 0 && setNotifications(newNotification);
  }, [data2]);

  // join socket
  useEffect(() => {
    if (socket && data?.id) {
      socket.emit("join", data?.id);
    }
  }, [socket, data?.id]);

  // get cart value from local storage
  useEffect(() => {
    const cartValue = getValueFromLocalStorage(cartKey);
    const parseCartValue = JSON.parse(cartValue as string);

    if (parseCartValue?.length) {
      dispatch(addAllServiceToCart(parseCartValue));
    }
  }, [dispatch]);

  const signOut = () => {
    SignOut({ router, dispatch });
  };

  const { dictionaries } = useAppSelector((state) => state.i18n);

  const header = dictionaries?.home?.header;

  return (
    <HeaderLayout className="z-[999999] shadow-md bg-transparent w-full px-4">
      {showNotification && (
        <Notification
          data={notifications}
          onClose={setShowNotification}
          isLoading={isLoading2}
        />
      )}

      <DateTime />

      <audio ref={audioRef} src={"/notifacation.wav"}></audio>

      <motion.div className=" max-w-[1200px] mx-auto text-white w-full flex items-center justify-between h-full">
        <Link
          href="/en"
          className="text-xl md:text-2xl lg:text-3xl font-extrabold shadow-2xl uppercase text-[#09ea4c] z-50"
        >
          Travel Trust
        </Link>

        <div className="flex gap-3 md:gap-4 items-center z-50">
          {/* icon  */}
          <div className="flex gap-3 md:gap-4 items-center mt-2">
            <Link href="/service/search" aria-label="service search">
              <AiOutlineSearch size={25} className="text-[#09ea4c]" />
            </Link>

            <Badge count={notifications?.length} className="cursor-pointer">
              <Avatar
                onClick={() => setShowNotification(true)}
                icon={
                  <IoMdNotifications size={22} className="text-[#09ea4c]" />
                }
                className="bg-transparent"
              />
            </Badge>

            <Link href="/dashboard/profile" aria-label="dashboard profile">
              <Badge count={cart?.length}>
                <Avatar
                  icon={
                    <BsFillCartCheckFill size={22} className="text-[#09ea4c]" />
                  }
                  className="bg-transparent"
                />
              </Badge>
            </Link>
          </div>

          <Link href="/message" className="hidden md:block">
            <Button type="link" className="text-xs md:text-sm">
              <span className="font-bold text-green-400 tracking-wide text-lg">
                {header?.message}
              </span>
            </Button>
          </Link>

          <Link href="/dashboard/profile" className="hidden md:block">
            <Button type="default" size="middle" className="text-xs md:text-sm">
              {header?.dashboard}
            </Button>
          </Link>

          <Dropdown
            menu={{
              items: headerItems({ user: data, signOut }),
            }}
            className="z-50 cursor-pointer"
          >
            <Space wrap size={16}>
              <Avatar
                src={data?.profileImage}
                size="large"
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Space>
          </Dropdown>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>
    </HeaderLayout>
  );
};

export default Header;
