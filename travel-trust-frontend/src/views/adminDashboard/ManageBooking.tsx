"use client";

import TTTable from "@/components/ui/TTTable";
import React, { useState } from "react";
import { Button, Input, Modal, message } from "antd";
import Link from "next/link";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useDeleteSingleBookingMutation,
  useGetAllBookingQuery,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";

const ManageBooking = () => {
  const query: Record<string, any> = {};

  const [handleDeleteBooking] = useDeleteSingleBookingMutation();

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

  const { data, isLoading, error } = useGetAllBookingQuery({ ...query });

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
      content: "Are you sure? You want to delete this item!",
      okText: "OK",
      cancelText: "Cancel",
      onOk: async () => {
        message.loading("Deleting.....");
        try {
          const res = (await handleDeleteBooking(id)) as any;
          if (res?.data?.id) {
            message.success("Booking Deleted successfully");
          }
        } catch (err: any) {
          message.error(err.message);
        }
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "service",
      render: function (data: any) {
        return <>{data?.name}</>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Types",
      dataIndex: "types",
    },
    {
      title: "Ticket",
      dataIndex: "ticket",
    },
    {
      title: "Status",
      dataIndex: "status",
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
    <div className="lg:w-[95%] h-[100%] items-center justify-center">
      <Input
        placeholder="Search bookings"
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
        dataSource={data?.bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ManageBooking;
