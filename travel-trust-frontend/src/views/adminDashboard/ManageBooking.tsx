"use client";

import TTTable from "@/components/ui/TTTable";
import React, { useState } from "react";
import { Button, Input, Modal, Select, message } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  useDeleteSingleBookingMutation,
  useGetAllBookingQuery,
  useUpdateStatusesMutation,
} from "@/redux/api/bookingApi";
import { useDebounced } from "@/redux/hooks";
import { IBooking } from "@/types";
import { BookingStatus } from "@/constants/booking";

const ManageBooking = () => {
  const query: Record<string, any> = {};

  const [handleDeleteBooking] = useDeleteSingleBookingMutation();
  const [handleUpdateBookingStatuses, { isLoading: updateStatusLoading }] =
    useUpdateStatusesMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statuses, setStatuses] = useState<any>([]);

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

  const handleStatusChange = (id: string, value: string) => {
    setStatuses((prev: { id: string; value: string }[]) => [
      ...prev,
      { id, value },
    ]);
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
      render: (data: any) => {
        const isCancel = data?.status === BookingStatus.CANCEL;

        return (
          <Select
            style={{ maxWidth: "100%", padding: 0 }}
            bordered={false}
            defaultValue={[data?.status]}
            onChange={(value: any) => handleStatusChange(data?.id, value)}
            disabled={isCancel}
            options={[
              {
                label: "Pending",
                value: "pending",
              },
              {
                label: "Confirm",
                value: "confirmed",
              },
              {
                label: "Cancel",
                value: "cancel",
              },
            ]}
          />
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

  const handleUpdateStatus = async () => {
    try {
      message.loading("Updating...");
      const res: any = await handleUpdateBookingStatuses({ statuses });

      if (res?.data) {
        setStatuses([]);
        message?.success("Booking status updated successfully.");
      }

      res?.error && message.error(res?.error?.data?.message);
    } catch (error: any) {
      message.error(error?.message);
    }
  };

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
        loading={isLoading ?? updateStatusLoading}
        columns={columns}
        dataSource={data?.bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        isButton={statuses.length > 0}
        onClickBtn={handleUpdateStatus}
      />
    </div>
  );
};

export default ManageBooking;
