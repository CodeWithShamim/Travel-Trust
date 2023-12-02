"use client";

import ChatMessage from "@/components/ui/ChatMessage";
import Loader from "@/components/ui/Loader";
import { useGetAllUserQuery } from "@/redux/api/authApi";
import { useGetAllMessageQuery } from "@/redux/api/messageApi";
import { useAppSelector, useSocket } from "@/redux/hooks";
import { IUser } from "@/types";
import { timeAgo } from "@/utils/common";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const { Sider, Content } = Layout;
import { CiMenuKebab } from "react-icons/ci";

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
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiverId, setReceiverId] = useState<string>("");

  const { data, isLoading } = useAppSelector((state) => state.user) as any;
  const router = useRouter();
  const socket = useSocket();

  const {
    data: data2,
    isLoading: isLoading2,
    error,
  } = useGetAllMessageQuery(null);

  const { data: data3, isLoading: isLoading3 } = useGetAllUserQuery(null);

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
  const handleSetMessages = () => {
    const newMessages = data2?.messages as any;
    newMessages?.length > 0 && setMessages(newMessages);
  };

  useEffect(() => {
    receiverId && handleSetMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data2, receiverId]);

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
    if (!receiverId || !message) return;

    const newMsg = {
      senderId: data?.id,
      receiverId,
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
    setReceiverId(user?.id);
  };

  const playSound = () => {
    audioRef?.current?.play();
  };

  return (
    <div className="max-w-[1250px] mx-auto px-4 relative">
      <div>
        <audio ref={audioRef} src={"/send.mp3"}></audio>
      </div>

      <Layout hasSider className="bg-white">
        <Sider className="min-h-screen bg-white shadow-2xl text-center px-4 overflow-y-auto py-2">
          <div className="flex flex-col gap-2 overflow-hidden py-2">
            {isLoading3 && <Loader />}

            {data3?.users?.map(
              (user: IUser, index: number) =>
                user?.id !== data?.id && (
                  <div
                    key={index}
                    className={`${
                      receiverId === user?.id
                        ? "bg-green-500 text-white"
                        : "bg-green-50"
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
                        <h6 className="text-xs">
                          {timeAgo(user?.createdAt as string)}
                        </h6>
                      </span>
                    </div>
                    <span>
                      <CiMenuKebab />
                    </span>
                  </div>
                )
            )}
          </div>
        </Sider>

        <Content className="relative pb-10 py-5">
          <div className="py-10 mb-2 px-4 bg-gray-100 rounded min-h-[70%] max-h-[400px] overflow-y-auto">
            {isLoading || isLoading2 ? <Loader /> : null}

            <div>
              {!receiverId && !isLoading2 ? (
                <div className="h-[300px] flex flex-col justify-center items-center">
                  <Image
                    src={require("@/assets/select.png")}
                    objectFit="cover"
                    width={200}
                    alt="not found image"
                  />
                  <p className="text-xl font-serif text-center">
                    Select user to start message
                  </p>
                </div>
              ) : null}
            </div>

            {messages?.map((message: IMessage) => (
              <ChatMessage
                key={message?.id}
                content={message?.content}
                timestamp={message?.createdAt}
                isCurrentUser={data?.id === message?.senderId}
              />
            ))}
          </div>

          <div className="absolute left-2 w-full flex flex-col items-end gap-3 ">
            <TextArea
              rows={3}
              className="w-full"
              placeholder="Write message..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              allowClear
            />
            <Button
              onClick={handleSendMessage}
              type="primary"
              className="w-[15%]"
              size="large"
              loading={isLoading || isLoading2 || isLoading3}
            >
              Send
            </Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Message;
