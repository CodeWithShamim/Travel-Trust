"use client";

import TTTable from "@/components/ui/TTTable";
import React, { useState } from "react";
import { Button, Image, Input, Modal, message } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  useDeleteSingleServiceMutation,
  useGetAllServiceQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";

const ManageService = () => {
  const query: Record<string, any> = {};

  const [handleDeleteService] = useDeleteSingleServiceMutation();

  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const { data, isLoading, error } = useGetAllServiceQuery({ ...query });

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

  const deleteHandler = async (id: string) => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure? You want to delete this service!",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        message.loading("Deleting.....");
        try {
          const res = (await handleDeleteService(id)) as any;
          if (res?.data?.id) {
            message.success("Service deleted successfully");
          }
        } catch (err: any) {
          message.error(err.message);
        }
      },
    });
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (url: string) => {
        return (
          <Image
            src={url}
            width={55}
            height={55}
            className="h-[55px] w-[55px] object-cover rounded"
            alt="user profile image"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => {
        return <span className="font-bold text-green-400">${price}</span>;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        return (
          <span
            className={`${
              status === "upcoming"
                ? "text-green-400 font-semibold"
                : "text-slate-900"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    {
      title: "Update",
      dataIndex: "id",
      render: function (id: string) {
        return (
          <Link href={`/dashboard/admin/edit-service/${id}`}>
            <Button type="primary">
              <BiEdit size={16} />
            </Button>
          </Link>
        );
      },
    },

    {
      title: "Delete",
      render: function (data: any) {
        return (
          <Button onClick={() => deleteHandler(data?.id)} type="primary" danger>
            <DeleteOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <div className="h-[100%] items-center justify-center">
      <TTTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.services}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isTitleBtn
        onAdd={() => router.push("/dashboard/admin/add-service")}
        type="Services"
      />
    </div>
  );
};

export default ManageService;
