"use client";

import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "antd";
import Image from "next/image";
import React from "react";
import { AiOutlineMail, AiOutlineContacts } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";

const Profile = ({ mode }: { mode?: string }) => {
  const user: any = useAppSelector((state) => state.user?.data);

  const contactLists = [
    {
      value: user?.email,
      icon: <AiOutlineMail />,
    },
    {
      value: user?.contactNo ?? "+88017-6282-2568",
      icon: <AiOutlineContacts />,
    },
    {
      value: user?.address ?? "Dhaka, Mirpur-1000, Bangladesh",
      icon: <FaRegAddressCard />,
    },
  ];

  const isEdit = mode === "edit";

  return (
    <div>
      <section>
        <Image
          src={require("@/assets/home1.jpg")}
          width={1300}
          height={400}
          className="h-[18rem] w-full object-cover"
          priority
          quality={100}
          alt="profile banner"
        />

        <div className="flex items-center gap-5 mt-[-8.5%] ml-8">
          <Image
            src={user.profileImage ?? require("@/assets/home1.jpg")}
            className="h-[120px] w-[120px]  rounded-full bordered object-cover shadow-2xl"
            priority
            width={120}
            height={120}
            layout="responsive"
            objectFit="cover"
            quality={100}
            alt="profile img"
          />

          <div className=" pb-14">
            <h1 className="text-2xl text-white fancy capitalize tracking-wider shadow-lg">
              {user?.username}
            </h1>
            <p className="text-green-400  tracking-widest font-bold shadow-2xl">
              Role : {user?.role}
            </p>
          </div>
        </div>
      </section>

      <section className="flex gap-8 items-center justify-between">
        <div className="shadow-2xl bg-white basis-4/12 p-6 my-10 rounded">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-4">
            {isEdit ? "Edit" : "About"}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            tenetur amet laudantium ullam voluptates veniam accusamus
            exercitationem alias veritatis rem. Molestias, dolorum quisquam ex
          </p>
          <div className="py-4 flex flex-col gap-4">
            {contactLists?.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span className="text-green-500">{item.icon}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 ">
            <p>
              Age : <span className="">{user?.age ?? 20}</span>
            </p>
            <p>
              Gender : <span className="">{user?.gender ?? "Male"}</span>
            </p>
          </div>
        </div>

        <div className="basis-4/12">
          <Image
            src={user?.profileImage ?? require("@/assets/gallery/1.jpg")}
            width={800}
            height={400}
            className="h-[290px] w-[680px]  object-cover rounded"
            alt="user post image"
            layout="responsive"
          />
        </div>
      </section>
    </div>
  );
};

export default Profile;
