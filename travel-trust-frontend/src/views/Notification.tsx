import { NotificationItems } from "@/constants/commons";
import { timeAgo } from "@/utils/common";
import { Drawer } from "antd";
import Link from "next/link";
import React from "react";
import { BiDotsVerticalRounded, BiNotification } from "react-icons/bi";
import { IoClose, IoNotificationsOffCircle } from "react-icons/io5";

interface INotificationProps {
  onClose: (v: boolean) => void;
}

const Notification = ({ onClose }: INotificationProps) => {
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
          {NotificationItems.map((item) => (
            <Link
              href={item?.link}
              key={item?.id}
              className="flex items-start gap-2 cursor-pointer hover:bg-green-100 transition-all rounded p-1"
              onClick={() => onClose(false)}
            >
              <IoNotificationsOffCircle size={32} className="text-green-400" />
              <span>
                <p className="text-black font-semibold">{item?.message}</p>
                <h5 className="text-green-600 text-sm">
                  {timeAgo(item?.timestamp)}
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
