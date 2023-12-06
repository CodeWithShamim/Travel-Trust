import Loader from "@/components/ui/Loader";
import { INotification } from "@/types";
import { timeAgo } from "@/utils/common";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoClose, IoNotificationsOffCircle } from "react-icons/io5";

interface INotificationProps {
  onClose: (v: boolean) => void;
  data: INotification[];
  isLoading: boolean;
}

const Notification = ({ onClose, data, isLoading }: INotificationProps) => {
  const findRoute = (notifacation: INotification) => {
    let route;

    switch (notifacation?.type) {
      case "booking":
        route = `/dashboard/user/bookings`;
        break;

      case "message":
        route = `/message`;
        break;

      default:
        route = `/service-details/${notifacation?.notificationDataId}`;
    }

    return route;
  };

  return (
    <div>
      <Drawer
        title={<span className="font-bold">Notification</span>}
        placement="right"
        open={true}
        onClose={() => onClose(false)}
        // width={270}
      >
        <div className="flex flex-col gap-3">
          {data?.length === 0 && (
            <div className="flex text-center justify-center gap-1 text-red-400">
              <IoNotificationsOffCircle size={30} />
              <p className="mt-1">Empty!</p>
            </div>
          )}

          {isLoading && <Loader />}

          {data?.map((item: INotification) => (
            <Link
              href={findRoute(item)}
              key={item?.id}
              className="flex items-center justify-between gap-2 cursor-pointer hover:bg-green-100 transition-all rounded p-1"
              onClick={() => onClose(false)}
            >
              <div className="w-full flex items-center justify-between gap-2">
                <div className="flex items-start">
                  <IoNotificationsOffCircle
                    size={32}
                    className="text-green-400"
                  />
                  <span>
                    <p className="text-black font-semibold">{item?.message}</p>
                    <h5 className="text-green-600 text-sm">
                      {timeAgo(item?.createdAt)}
                    </h5>
                  </span>
                </div>

                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={item?.avatar}
                  alt="notification image"
                />
              </div>
              <IoClose size={17} className="text-black z-50" />
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
