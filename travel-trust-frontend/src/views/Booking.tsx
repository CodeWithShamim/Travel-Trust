"use client";

import TTTable from "@/components/ui/TTTable";
import React, { useState } from "react";
import { Button, message } from "antd";
import Link from "next/link";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  useDeleteSingleBookingMutation,
  useGetAllBookingQuery,
} from "@/redux/api/bookingApi";

const Booking = () => {
  const query: Record<string, any> = {};
  const { data: bookings, isLoading, error } = useGetAllBookingQuery(null);
  const [handleDeleteBooking] = useDeleteSingleBookingMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  console.log({ bookings });

  const meta = bookings?.meta;
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

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
    message.loading("Deleting.....");
    try {
      const res = (await handleDeleteBooking(id)) as any;
      if (res?.data?.id) {
        message.success("Booking Deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
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

  console.log({ TTT: meta?.total });

  return (
    <div className="w-full">
      <TTTable
        loading={isLoading}
        columns={columns}
        dataSource={bookings}
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

export default Booking;
