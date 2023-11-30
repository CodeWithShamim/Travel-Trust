import Loader from "@/components/ui/Loader";
import { INotification } from "@/types";
import { timeAgo } from "@/utils/common";
import { Drawer } from "antd";
import Link from "next/link";
import React from "react";
import { IoClose, IoNotificationsOffCircle } from "react-icons/io5";

interface INotificationProps {
  onClose: (v: boolean) => void;
  data: INotification[];
  isLoading: boolean;
}

const Notification = ({ onClose, data, isLoading }: INotificationProps) => {
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
              href={`/service-details/${item?.notificationDataId}`}
              key={item?.id}
              className="flex items-center justify-between gap-2 cursor-pointer hover:bg-green-100 transition-all rounded p-1"
              onClick={() => onClose(false)}
            >
              <div className="flex items-start gap-2">
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
              <IoClose size={17} className="text-black z-50" />
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
