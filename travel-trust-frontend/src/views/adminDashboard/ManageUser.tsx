"use client";

import TTTable from "@/components/ui/TTTable";
import React, { useEffect, useState } from "react";
import { Button, Image, Input, Modal, message } from "antd";

import { AiOutlineDelete, AiOutlineWarning } from "react-icons/ai";

import { useDebounced } from "@/redux/hooks";
import {
  useCreateUserToAdminMutation,
  useDeleteSingleUserMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "@/redux/api/authApi";
import { timeAgo } from "@/utils/common";
import { USER_ROLE } from "@/constants/role";
import { BiEdit } from "react-icons/bi";
import UpdateUserInfo from "@/components/ui/UpdateUserInfo";
import { useUploadImage } from "@/utils/upload";
import { SubmitHandler } from "react-hook-form";
import { IUser } from "@/types";

const ManageUser = () => {
  const query: Record<string, any> = {};
  query["role"] = USER_ROLE.USER;

  const [handleDeleteUser] = useDeleteSingleUserMutation();
  const [handleCreateAdmin] = useCreateUserToAdminMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { handleUpload, imageUrl, uploadLoading } = useUploadImage();
  const [
    handeUpdateUser,
    { data: updateUserData, isLoading: updateLoading, error: updateError },
  ] = useUpdateUserMutation();

  const [user, setUser] = useState<IUser | null>(null);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [age, setAge] = useState<string | undefined>(undefined);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, error } = useGetAllUserQuery({ ...query });

  const meta = data?.meta as any;

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  // update user profile image
  useEffect(() => {
    if (imageUrl) {
      const updateData = {
        id: user?.id,
        profileImage: imageUrl,
      };
      handeUpdateUser(updateData);
    }
  }, [imageUrl, handeUpdateUser, user]);

  const deleteHandler = async (id: string) => {
    Modal.confirm({
      title: <span className="text-red-500 ">Warning</span>,
      icon: <AiOutlineWarning className="text-red-500 m-1" size={20} />,
      content: "Are you sure? You want to delete this user!",
      okText: "OK",
      cancelText: "Cancel",
      onOk: async () => {
        message.loading("Deleting.....");
        try {
          const res = (await handleDeleteUser(id)) as any;
          if (res?.data?.id) {
            message.success("User Deleted successfully");
          }
        } catch (err: any) {
          console.log({ err });
          message.error(err.message || "Something went wrong!");
        }
      },
    });
  };

  const handleUserToAdmin = async (id: string) => {
    Modal.confirm({
      title: <span className="text-red-500 ">Warning</span>,
      icon: <AiOutlineWarning className="text-red-500 m-1" size={20} />,
      content: "Are you sure? You want to make this user to Admin!",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        message.loading("Admin created loading.....");
        try {
          const res = (await handleCreateAdmin(id)) as any;
          if (res?.data?.id) {
            message.success("admin successfully created");
          }
        } catch (err: any) {
          console.log({ err });
          message.error(err.message || "Something went wrong!");
        }
      },
    });
  };

  const columns = [
    {
      title: "",
      dataIndex: "profileImage",
      render: (data: string) => {
        return (
          <Image
            src={data}
            width={55}
            height={55}
            className="h-[55px] w-[55px] object-cover rounded"
            alt="user profile image"
          />
        );
      },
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact number",
      dataIndex: "contactNo",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Registration",
      dataIndex: "createdAt",
      render: (data: any) => {
        return timeAgo(data);
      },
    },
    {
      title: "Role",
      render: (data: any) => {
        return (
          <div className="flex gap-2">
            <span>{data?.role}</span>
            <Button
              type="primary"
              size="small"
              onClick={() => handleUserToAdmin(data?.id)}
            >
              <span className="font-semibold">Make Admin</span>
            </Button>
          </div>
        );
      },
    },

    {
      title: "Update",
      render: function (data: IUser) {
        return (
          <Button
            type="primary"
            onClick={() => {
              setUser(data);
              setShowEditModal(true);
            }}
          >
            <BiEdit size={16} />
          </Button>
        );
      },
    },

    {
      title: "Remove",
      dataIndex: "id",
      render: function (id: string) {
        return (
          <Button onClick={() => deleteHandler(id)} type="primary" danger>
            <AiOutlineDelete size={16} />
          </Button>
        );
      },
    },
  ];

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
    <div className="lg:w-[95%] h-[100%] items-center justify-center">
      <Input
        placeholder="Search users"
        type="text"
        allowClear
        className="text-black border-r-0 mb-6 lg:w-[40%] h-16 rounded-md border-neutral-200"
        style={{ width: Number(window?.innerWidth) - 118 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TTTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.users}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

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

export default ManageUser;
