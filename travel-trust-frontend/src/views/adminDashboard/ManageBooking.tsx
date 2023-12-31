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
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { IBooking, IService } from "@/types";
import { BookingStatus } from "@/constants/booking";
import CustomSelect from "@/components/ui/CustomSelect";
import PiChart from "@/components/charts/PiChart";
import LineChart from "@/components/charts/LineChart";
import { PAYMENT_ROLE, USER_ROLE } from "@/constants/role";
import PaymentModal from "@/components/common/PaymentModal";
import Image from "next/image";
import Link from "next/link";

const ManageBooking = () => {
  const query: Record<string, any> = {};

  const [handleDeleteBooking] = useDeleteSingleBookingMutation();
  const [handleUpdateBookingStatuses, { isLoading: updateStatusLoading }] =
    useUpdateStatusesMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statuses, setStatuses] = useState<any>([]);
  const [bookingData, setBookingData] = useState<IBooking | null>(null);

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

  const user: any = useAppSelector((state) => state?.user?.data);

  const { data, isLoading, error } = useGetAllBookingQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

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

  const handleStatusChange = (id: string, userId: string, value: string) => {
    setStatuses((prev: { id: string; value: string }[]) => [
      ...prev,
      { id, userId, value },
    ]);
  };

  const getPaymentCondition = (data: any) => {
    const status = data?.payments[data?.payments?.length - 1]?.paymentStatus;

    return status === PAYMENT_ROLE.SUCCEEDED ? (
      <span className="bg-green-500 px-8 py-[1px] rounded-md text-green-700">
        {status}✔
      </span>
    ) : (
      <Button
        onClick={() => setBookingData(data)}
        type="primary"
        size="middle"
        disabled={data?.status === BookingStatus.CANCEL}
      >
        Payment Now
      </Button>
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "service",
      render: (service: IService) => {
        return (
          <Link href={`/service-details/${service?.id}`}>
            <Image
              src={service?.image}
              width={40}
              height={40}
              className="h-[40px] w-[40px] object-cover rounded"
              layout="responsive"
              alt="service image"
            />
          </Link>
        );
      },
    },
    ,
    {
      title: "Service Name",
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
      title: "Payment",
      render: function (data: any) {
        return (
          <>
            <div>{getPaymentCondition(data)}</div>
          </>
        );
      },
    },

    {
      title: "Status",
      render: (data: any) => {
        const isCancel = data?.status === BookingStatus.CANCEL;
        const isConfirm = data?.status === BookingStatus.CONFIRMED;

        const styles = {
          border: isCancel
            ? "1px solid red"
            : isConfirm
            ? "1px solid #09ea4c"
            : "1px solid #d1d100",
          backgroundColor: isCancel
            ? "#FF7875"
            : isConfirm
            ? "#22C55E"
            : "#d1d100",
        };

        return user?.role === USER_ROLE.USER ? (
          <span
            style={{
              ...styles,
            }}
            className="px-8 py-[1px] rounded-md text-green-700"
          >
            {data?.status}
          </span>
        ) : (
          <CustomSelect
            onChange={(value: any) =>
              handleStatusChange(data?.id, data?.user?.id, value)
            }
            defaultValue={data?.status}
            disabled={isCancel}
            optionsValue={["pending", "confirmed", "cancel"]}
            style={{
              ...styles,
            }}
          />
        );
      },
    },

    {
      title: "Delete",
      render: function (data: any) {
        return (
          <Button
            onClick={() => deleteHandler(data?.id)}
            type="primary"
            danger
            disabled={
              data?.payments[data?.payments?.length - 1]?.paymentStatus ===
                PAYMENT_ROLE.SUCCEEDED && user?.role === USER_ROLE.USER
            }
          >
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

  const PiChartData = {
    labels: ["Confirmed", "Cancelled", "Pending"],
    datasets: [
      {
        label: "Status",
        data: [30, 25, 35],
        backgroundColor: ["#09ea4c", "#FF6384", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  const LineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Booking Confirmed",
        data: [0, 1, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "#09ea4c",
        tension: 0.1,
        borderWidth: 1.5,
      },
      {
        label: "Booking Cancelled",
        data: [0, 0, 2, 0, 0, 0, 0],
        fill: false,
        borderColor: "#FF6384",
        tension: 0.1,
        borderWidth: 1.5,
      },
      {
        label: "Booking Pending",
        data: [0, 0, 0, 0, 0, 0, 5],
        fill: false,
        borderColor: "#FF9F40",
        tension: 0.1,
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="h-[100%] items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row items-end lg:items-center justify-center gap-8 my-10">
        <PiChart data={PiChartData} />
        <LineChart data={LineChartData} />
      </div>

      <div>
        <PaymentModal
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      </div>

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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isButton={statuses.length > 0}
        onClickBtn={handleUpdateStatus}
        type="Bookings"
      />
    </div>
  );
};

export default ManageBooking;
