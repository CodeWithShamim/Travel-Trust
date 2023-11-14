"use client";

import CartCard from "@/components/ui/CartCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IService, IUser } from "@/types";
import { Spin, Upload, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineMail, AiOutlineContacts } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCameraFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import { useUploadImage } from "@/utils/upload";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { setUserData } from "@/redux/slices/userSlice";
import { SubmitHandler } from "react-hook-form";
import UpdateUserInfo from "@/components/ui/UpdateUserInfo";

const Profile = () => {
  const user: any = useAppSelector((state) => state.user?.data);
  const cart: IService[] = useAppSelector((state) => state.service?.cart);
  const dispatch = useAppDispatch();
  const { handleUpload, imageUrl, uploadLoading } = useUploadImage();
  const {
    handleUpload: handleUploadBanner,
    imageUrl: bannerUrl,
    uploadLoading: uploadBannerLoading,
  } = useUploadImage();

  const updateData: any = {};
  const [handeUpdateUser, { data, isLoading, error }] = useUpdateUserMutation();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    updateData["id"] = user?.id;
    if (imageUrl) {
      updateData["profileImage"] = imageUrl;
    }
    if (bannerUrl) {
      updateData["bannerImage"] = bannerUrl;
    }

    if (imageUrl || bannerUrl) {
      handeUpdateUser(updateData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, bannerUrl]);

  if (data?.id) {
    dispatch(setUserData(data));
  }

  const handleProfileUpdate: SubmitHandler<any> = async (
    data?: IUser,
    reset?: any
  ) => {
    const newData = { id: user?.id, ...data, gender, age };
    try {
      const res = await handeUpdateUser(newData).unwrap();
    } catch (error: any) {
      message.error(error?.data.message);
    } finally {
      setShowEditModal(false);
      setAge(undefined);
      setGender(undefined);
      reset();
    }
  };

  return (
    <div>
      <section>
        <div className="relative">
          <Image
            src={user?.bannerImage ?? require("@/assets/home1.webp")}
            width={1300}
            height={400}
            className="h-[18rem] w-full object-cover"
            priority
            quality={100}
            alt="profile banner"
          />

          {uploadBannerLoading && (
            <>
              <span className="absolute inset-1/2">
                <Spin />
              </span>
              <div className="absolute bg-black inset-0 h-full w-full opacity-60"></div>
            </>
          )}

          <div className="absolute z-50 bg-white rounded px-2 bottom-4 right-4 hover:bg-green-200 transition-all">
            <Upload
              customRequest={(e: any) =>
                handleUploadBanner(e.file, e.onSuccess, e.onError)
              }
              showUploadList={false}
              maxCount={1}
              disabled={uploadBannerLoading}
            >
              <span className="flex gap-2 items-center cursor-pointer">
                <BsCameraFill />
                <h3 className="font-serif">Upload banner image</h3>
              </span>
            </Upload>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start lg:items-center gap-3 lg:gap-5 mt-[-8%] ml-2 md:ml-4 lg:ml-8 relative">
          {ProfileImageUpload(user, uploadLoading, handleUpload)}

          <div className="lg:mb-14">
            <h1 className="text-xl md:text-2xl text-black md:text-white fancy capitalize tracking-wider">
              {user?.username}
            </h1>
            <p className="text-gray-500 tracking-widest font-bold">
              Role : {user?.role}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-5 items-start my-10">
        <div className="relative shadow-2xl bg-white w-full lg:w-[35%] px-6 py-8 lg:py-12 rounded">
          {/* edit btn  */}
          <span
            onClick={() => setShowEditModal(true)}
            className="absolute top-3 right-3 bg-green-400 rounded-full p-2 h-10 w-10 hover:bg-green-300 cursor-pointer text-center"
          >
            {/* <Tooltip title="Edit" color="#09ea4c"> */}
            <BiEdit size={20} color="#FFF" />
            {/* </Tooltip> */}
          </span>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-4">
            About
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

        <div className="w-full lg:w-[60%] lg:ml-10 h-full">
          {cart.length === 0 ? (
            <Image
              src={user?.profileImage ?? require("@/assets/gallery/1.webp")}
              width={800}
              height={300}
              className="md:h-full lg:h-[25.3rem] w-full object-cover rounded"
              alt="user post image"
              layout="responsive"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col gap-5">
              {cart?.map((item: IService) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Edit modal */}
      <section>
        {showEditModal && (
          <UpdateUserInfo
            user={user}
            age={age as string}
            gender={gender as string}
            setAge={setAge}
            setGender={setGender}
            uploadLoading={uploadLoading}
            isLoading={isLoading}
            handleUpload={handleUpload}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            handleProfileUpdate={handleProfileUpdate}
          />
        )}
      </section>
    </div>
  );
};

export default Profile;

export const ProfileImageUpload = (
  user: IUser | null,
  uploadLoading: boolean,
  handleUpload: any
) => (
  <div className="relative cursor-pointer">
    <Image
      src={user?.profileImage ?? require("@/assets/home1.webp")}
      className="h-[50px] w-[50px] md:h-[80px] md:w-[80px] lg:h-[120px] lg:w-[120px]  rounded-full bordered object-cover shadow lg:shadow-2xl"
      width={120}
      height={120}
      layout="responsive"
      loading="lazy"
      objectFit="cover"
      quality={100}
      alt="profile img"
    />

    {uploadLoading && (
      <>
        <span className="absolute inset-16">
          <Spin />
        </span>
        <div className="absolute bg-black inset-0 h-full w-full rounded-full opacity-60"></div>
      </>
    )}

    <span className="absolute bg-white rounded-full text-center p-2 bottom-2 md:bottom-10 lg:bottom-6 left-8 md:left-auto md:right-0 w-8 h-8 lg:w-10 lg:h-10 hover:bg-gray-300">
      <Upload
        customRequest={(e: any) => handleUpload(e.file, e.onSuccess, e.onError)}
        showUploadList={false}
        maxCount={1}
        disabled={uploadLoading}
      >
        <BsCameraFill className="text-lg md:text-xl lg:text-2xl" />
      </Upload>
    </span>
  </div>
);
