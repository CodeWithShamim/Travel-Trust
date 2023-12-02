"use client";

import ChatMessage from "@/components/ui/ChatMessage";
import { Button, Input, Layout } from "antd";
import React, { useState } from "react";
const { Sider, Content } = Layout;
import { CiMenuKebab } from "react-icons/ci";

const { TextArea } = Input;

interface IMessage {
  id: string;
  content: string;
  senderId?: string;
  receiverId?: string;
  createdAt: string;
  isCurrentUser: boolean;
}

const Message = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSendMessage = () => {
    const newMsg = {
      id: 1,
      content: message,
      createdAt: "2023-11-01 12:00:00",
      isCurrentUser: true,
    };

    setMessages((prev: any) => [...prev, newMsg]);
    audioRef?.current?.play();
    setMessage("");
  };

  return (
    <div className="max-w-[1250px] mx-auto px-4 relative py-2">
      <audio ref={audioRef} src={"/notifacation.wav"}></audio>

      <Layout hasSider className="bg-white">
        <Sider className="h-screen w-24 bg-white shadow-2xl text-center px-4">
          <div className="flex flex-col gap-2 overflow-hidden py-2">
            {Array.from({ length: 1 }).map((item, index) => (
              <div
                key={index}
                className="font-sembold bg-green-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white flex items-center justify-between transition-all "
              >
                <p>shamim</p>
                <CiMenuKebab />
              </div>
            ))}
          </div>
        </Sider>

        <Content className="relative pb-10">
          <div className="py-10 mb-2 px-4 bg-gray-100 rounded min-h-[70%] max-h-[400px] overflow-y-auto">
            {messages?.map((message: IMessage) => (
              <ChatMessage
                key={message?.id}
                content={message?.content}
                timestamp={message?.createdAt}
                isCurrentUser={message?.isCurrentUser}
              />
            ))}
          </div>

          <div className="absolute left-2 w-full flex flex-col items-end gap-3">
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
