"use client";

import ChatMessage from "@/components/ui/ChatMessage";
import Loader from "@/components/ui/Loader";
import { useGetAllUserQuery } from "@/redux/api/authApi";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";
import { useAppSelector, useSocket } from "@/redux/hooks";
import { IUser } from "@/types";
import { timeAgo } from "@/utils/common";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Input, Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const { Sider, Content } = Layout;
import { CiMenuKebab } from "react-icons/ci";
import styles from "@/styles/common.module.css";
import HomeBackButton from "@/components/ui/HomeBackButton";
import { USER_ROLE } from "@/constants/role";
import { FaVideo } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";

const { TextArea } = Input;

interface IMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  isCurrentUser: boolean;
}

const Message = () => {
  const query: Record<string, any> = {};

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiverUser, setReceiverUser] = useState<any>();

  const { data, isLoading } = useAppSelector((state) => state.user) as any;

  const router = useRouter();
  const socket = useSocket();

  query["senderId"] = data?.id;
  query["receiverId"] = receiverUser?.id;

  const {
    data: data2,
    isLoading: isLoading2,
    error,
  } = useGetAllMessageQuery({ ...query }, { refetchOnMountOrArgChange: true });

  const { data: data3, isLoading: isLoading3 } = useGetAllUserQuery(null);

  const users = data3?.users?.filter((user: IUser) => {
    if (data?.role === USER_ROLE.USER) {
      return (
        user?.role === USER_ROLE.ADMIN || user?.role === USER_ROLE.SUPER_ADMIN
      );
    } else {
      return user?.role === USER_ROLE.USER;
    }
  });

  // join room
  useEffect(() => {
    const userId = data?.id;

    if (!userId && !isLoading) {
      router.push("/login");
    }

    if (socket && userId) {
      socket.emit("join", userId);
    }
  }, [socket, data, router, isLoading]);

  // received message from databse
  useEffect(() => {
    const newMessages = data2?.messages as any;

    if (receiverUser?.id) {
      setWarning(false);
      newMessages?.length > 0 ? setMessages(newMessages) : setMessages([]);
    }
  }, [data2, receiverUser]);

  // received message via socket
  useEffect(() => {
    if (socket) {
      socket.on("message", (newMsg: IMessage) => {
        if (newMsg?.senderId !== data?.id) {
          playSound();
          setMessages((prev: any) => [...prev, newMsg]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // send message
  const handleSendMessage = () => {
    if (!message) {
      return;
    }
    if (!receiverUser?.id) {
      setWarning(true);
      return;
    }

    setWarning(false);

    const newMsg = {
      senderId: data?.id,
      receiverId: receiverUser?.id,
      content: message,
      createdAt: new Date(),
    };

    // step-1
    setMessages((prev: any) => [...prev, newMsg]);
    // step-2
    socket.emit("message", newMsg);

    playSound();
    setMessage("");
  };

  const handleSelectedUserToChat = (user: IUser) => {
    setDrawerOpen(false);
    setReceiverUser(user);
  };

  const playSound = () => {
    audioRef?.current?.play();
  };

  return (
    <div className={`${styles["chat-bg-image"]}`}>
      <section className={`max-w-[1650px] mx-auto relative`}>
        <div>
          <audio ref={audioRef} src={"/send.mp3"}></audio>
        </div>

        <Layout hasSider className="bg-white">
          <Sider
            // collapsed={true}
            className="hidden md:block min-h-screen bg-white shadow-2xl text-center px-4 overflow-y-auto py-2"
          >
            <HomeBackButton />

            {SideBarItem({
              isLoading: isLoading3,
              users,
              receiverUser,
              handleSelectedUserToChat,
            })}
          </Sider>

          <Content className="relative h-screen">
            {/* header content */}
            <div className="sticky flex items-center top-0 left-0 right-0 justify-between px-4 gap-2 h-14 bg-slate-200 shadow-2xl w-full z-50">
              <div className="md:hidden">
                <HomeBackButton isDivider={false} />
              </div>

              <div className="flex items-center gap-2">
                <Avatar
                  src={receiverUser?.profileImage}
                  size="small"
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                  className="cursor-pointer"
                />
                <p className="capitalize font-semibold">
                  {receiverUser?.username}
                </p>
              </div>

              {warning && (
                <span className="text-red-500 font-bold">
                  Please select user!
                </span>
              )}

              <div className="flex items-center gap-3 md:gap-5">
                <span className="cursor-pointer text-center h-8 w-8 bg-slate-300 p-2 rounded-full">
                  <FaVideo size={16} />
                </span>
                <span className="cursor-pointer text-center h-8 w-8 bg-slate-300 p-2 rounded-full">
                  <MdAddCall size={16} />
                </span>
                <span className="cursor-pointer hidden md:block pt-1">
                  <BsThreeDotsVertical size={16} />
                </span>
                <span
                  onClick={() => setDrawerOpen(true)}
                  className="md:hidden cursor-pointer pt-1 animate-pulse"
                >
                  <BiMenu size={24} className="md:hidden" />
                </span>
              </div>
            </div>

            {/* Content  */}
            <div
              className={`${styles["chat-bg-image2"]} bg-opacity-50 py-10 pb-16 rounded absolute inset-0 overflow-y-auto`}
            >
              {isLoading || isLoading2 ? <Loader /> : null}

              {/* Drawer for mobile device  */}
              <div className="">
                <Drawer
                  title="Select User"
                  placement="right"
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                >
                  {SideBarItem({
                    isLoading: isLoading3,
                    users,
                    receiverUser,
                    handleSelectedUserToChat,
                  })}
                </Drawer>
              </div>

              {/* Empty content  */}
              {(!receiverUser?.id && !isLoading2) ||
              (messages?.length < 1 && !isLoading2) ? (
                <div className="flex flex-col justify-center items-center h-[92%]">
                  (
                  <div className="flex flex-col justify-center items-center shadow">
                    <Image
                      src={require("@/assets/select.png")}
                      objectFit="cover"
                      width={200}
                      alt="not found image"
                    />
                    <p className="text-xl font-semibold text-center text-white">
                      Select user to start message
                    </p>
                  </div>
                  )
                </div>
              ) : null}

              {/* messages  */}
              <div className="p-4 mb-6">
                {receiverUser?.id &&
                  messages?.map((message: IMessage) => (
                    <ChatMessage
                      key={message?.id}
                      content={message?.content}
                      timestamp={message?.createdAt}
                      isCurrentUser={data?.id === message?.senderId}
                    />
                  ))}
              </div>
            </div>

            {/* message footer */}
            <div className="absolute left-0 right-0 bottom-0 w-full h-30 bg-slate-200">
              <div className="p-2 flex items-center">
                <TextArea
                  rows={2}
                  className="w-full rounded-none border-green-400"
                  placeholder="Write message..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  allowClear
                />
                <Button
                  onClick={handleSendMessage}
                  type="primary"
                  className="w-[30%] md:w-[15%] rounded-none h-16"
                  size="large"
                  loading={isLoading || isLoading2 || isLoading3}
                >
                  <span className="md:font-semibold uppercase">Send</span>
                </Button>
              </div>
            </div>
          </Content>
        </Layout>
      </section>
    </div>
  );
};

export default Message;

const SideBarItem = ({
  isLoading,
  users,
  receiverUser,
  handleSelectedUserToChat,
}: {
  isLoading: boolean;
  users: IUser[] | undefined;
  receiverUser: IUser;
  handleSelectedUserToChat: (v: IUser) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 overflow-hidden py-2">
      {isLoading && <Loader />}

      {users?.map((user: IUser, index: number) => (
        <div
          key={index}
          className={`${
            receiverUser?.id === user?.id
              ? "bg-green-500 text-white"
              : "bg-green-100"
          } font-sembold px-4 py-2 rounded-sm cursor-pointer hover:bg-green-400 hover:text-white flex items-center justify-between transition-all`}
          onClick={() => handleSelectedUserToChat(user)}
        >
          <div className="flex item-center gap-2">
            <Avatar
              src={user?.profileImage}
              size="small"
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />

            <span className="text-left">
              <p className="capitalize">{user?.username}</p>
              <h6 className="text-xs">{timeAgo(user?.createdAt as string)}</h6>
            </span>
          </div>
          <span>
            <CiMenuKebab />
          </span>
        </div>
      ))}
    </div>
  );
};
