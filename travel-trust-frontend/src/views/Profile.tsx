"use client";

import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import { SettingOutlined } from "@ant-design/icons";

const Profile = () => {
  const user: any = useAppSelector((state) => state.user?.data);

  return (
    <div>
      <div className="w-full relative">
        <Image
          src={require("@/assets/profile-banner.jpg")}
          objectFit="cover"
          className="w-full h-full rounded"
          alt="profile banner"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute top-2 left-2 shadow-2xl cursor-pointer">
          <Avatar size="large" src={user?.profileImage} />
        </div>
        <div className="absolute flex gap-2 flex-row top-2 right-2 shadow-2xl cursor-pointer ">
          <p className="font-medium text-white">{user?.email}</p>
          <SettingOutlined
            style={{ color: "white", fontWeight: "900", fontSize: 32 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
