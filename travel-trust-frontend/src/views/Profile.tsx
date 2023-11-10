"use client";

import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import { SettingOutlined } from "@ant-design/icons";

const Profile = () => {
  const user: any = useAppSelector((state) => state.user?.data);

  console.log({ user });

  return (
    <div>
      <div className="w-full">
        <div className="relative">
          <Image
            src={require("@/assets/home1.jpg")}
            width={1300}
            height={400}
            className="h-[18rem] w-full object-cover absolute inset-0"
            priority
            quality={100}
            alt="profile banner"
          />

          <div className="h-[120px] w-[120px] absolute top-[150px] left-10 flex items-center gap-5">
            <Image
              src={user.profileImage ?? require("@/assets/banner3.jpg")}
              className="w-full h-full rounded-full bordered object-cover shadow-2xl"
              priority
              width={120}
              height={120}
              layout="responsive"
              objectFit="cover"
              quality={100}
              alt="profile img"
            />

            <div className=" pb-14">
              <h1 className="text-2xl text-white fancy capitalize tracking-wider">
                {user?.username}
              </h1>
              <p className="text-green-400  tracking-widest">
                Role {user?.role}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute flex gap-2 flex-row top-2 right-2 shadow-2xl cursor-pointer px-2">
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
