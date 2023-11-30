import { NotificationItems } from "@/constants/commons";
import { INotification } from "@/types";
import { timeAgo } from "@/utils/common";
import { Drawer } from "antd";
import Link from "next/link";
import React from "react";
import { IoClose, IoNotificationsOffCircle } from "react-icons/io5";

interface INotificationProps {
  onClose: (v: boolean) => void;
  data: INotification[];
}

const Notification = ({ onClose, data }: INotificationProps) => {
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
          {data?.map((item: INotification) => (
            <Link
              href={`/service-details/${item?.notificationDataId}`}
              key={item?.id}
              className="flex items-start gap-2 cursor-pointer hover:bg-green-100 transition-all rounded p-1"
              onClick={() => onClose(false)}
            >
              <IoNotificationsOffCircle size={32} className="text-green-400" />
              <span>
                <p className="text-black font-semibold">{item?.message}</p>
                <h5 className="text-green-600 text-sm">
                  {timeAgo(item?.createdAt)}
                </h5>
              </span>
              {/* <span>{item.timestamp}</span> */}
              <IoClose size={17} className="text-black z-50" />
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Notification;
