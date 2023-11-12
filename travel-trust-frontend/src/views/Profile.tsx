"use client";

import CartCard from "@/components/ui/CartCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IService, IUser } from "@/types";
import { Avatar, Button, Spin, Tooltip, Upload, message } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiOutlineMail, AiOutlineContacts } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { BsCameraFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import { useUploadImage } from "@/utils/upload";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { setUserData } from "@/redux/slices/userSlice";
import EditModal from "@/components/ui/EditModal";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import CustomSelect from "@/components/ui/CustomSelect";
import { SubmitHandler } from "react-hook-form";

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
      console.log({ res });
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
            src={user?.bannerImage ?? require("@/assets/home1.jpg")}
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
              <div className="absolute bg-black inset-0 h-full w-full rounded-full opacity-60"></div>
            </>
          )}

          <div className="absolute bg-white rounded px-2 bottom-4 right-4 hover:bg-green-200 transition-all">
            <Upload
              customRequest={(e: any) =>
                handleUploadBanner(e.file, e.onSuccess, e.onError)
              }
              showUploadList={false}
              maxCount={1}
              disabled={uploadBannerLoading}
            >
              <span className="flex gap-2 items-center cursor-pointer">
                <BsCameraFill size={16} />
                <h3 className="font-serif">Upload banner image</h3>
              </span>
            </Upload>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-[-8.5%] ml-8">
          {ProfileImageUpload(user, uploadLoading, handleUpload)}
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

      <section className="flex gap-5 items-start my-10">
        <div className="relative shadow-2xl bg-white w-[35%] px-6 py-8 lg:py-12 rounded">
          {/* edit btn  */}
          <span
            onClick={() => setShowEditModal(true)}
            className="absolute top-3 right-3 bg-green-400 rounded-full p-2 h-10 w-10 hover:bg-green-300 cursor-pointer text-center"
          >
            <Tooltip title="Edit" color="#09ea4c">
              <BiEdit size={20} color="#FFF" />
            </Tooltip>
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

        <div className="w-[60%] ml-10 h-full">
          {cart.length === 0 ? (
            <Image
              src={user?.profileImage ?? require("@/assets/gallery/1.jpg")}
              width={800}
              height={300}
              className="md:h-full lg:h-[25.3rem] w-full object-cover rounded"
              alt="user post image"
              layout="responsive"
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
          <EditModal
            title={user?.username}
            open={showEditModal}
            onCancel={() => setShowEditModal(false)}
          >
            <Form submitHandler={handleProfileUpdate}>
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div className="w-[70%] flex flex-col gap-1">
                    <FormInput
                      name="username"
                      size="large"
                      disabled
                      defaultValue={user?.username}
                    />

                    <FormInput
                      name="email"
                      size="large"
                      placeholder="Email"
                      disabled
                      defaultValue={user?.email}
                    />
                    <FormInput
                      name="contactNo"
                      type="text"
                      size="large"
                      placeholder="Contact number"
                      defaultValue={user?.contactNo}
                    />
                    <FormInput
                      name="address"
                      type="text"
                      size="large"
                      placeholder="Address"
                      defaultValue={user?.address}
                      isStyles
                    />
                  </div>

                  <div className="w-[30%]">
                    {ProfileImageUpload(user, uploadLoading, handleUpload)}
                  </div>
                </div>

                <div className="flex gap-5">
                  <CustomSelect
                    placeholder="Gender"
                    onChange={setGender}
                    value={gender ?? user?.gender ?? null}
                    optionsValue={["Male", "Female", "Custom"]}
                    style={{
                      border: "1px solid #09ea4c",
                    }}
                  />
                  <CustomSelect
                    placeholder="Age"
                    onChange={setAge}
                    value={age ?? user?.age ?? null}
                    optionsValue={[20, 21, 22, 23, 24, 25, 26]}
                    style={{
                      border: "1px solid #09ea4c",
                    }}
                  />
                </div>

                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  loading={isLoading}
                >
                  Update
                </Button>
              </div>
            </Form>
          </EditModal>
        )}
      </section>
    </div>
  );
};

export default Profile;

const ProfileImageUpload = (
  user: IUser,
  uploadLoading: boolean,
  handleUpload: any
) => (
  <div className="relative cursor-pointer">
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

    {uploadLoading && (
      <>
        <span className="absolute inset-16 ">
          <Spin />
        </span>
        <div className="absolute bg-black inset-0 h-full w-full rounded-full opacity-60"></div>
      </>
    )}

    <span className="absolute bg-white rounded-full p-2 bottom-4 right-0 w-10 h-10 hover:bg-gray-300">
      <Upload
        customRequest={(e: any) => handleUpload(e.file, e.onSuccess, e.onError)}
        showUploadList={false}
        maxCount={1}
        disabled={uploadLoading}
      >
        <BsCameraFill size={22} />
      </Upload>
    </span>
  </div>
);
