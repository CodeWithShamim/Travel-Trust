"use client";

import { Button, Input, Layout } from "antd";
import React from "react";
const { Sider, Content } = Layout;
import { CiMenuKebab } from "react-icons/ci";

const { TextArea } = Input;

const Message = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 relative">
      <Layout hasSider className="bg-white">
        <Sider className="h-screen w-24 bg-white shadow-2xl text-center p-4">
          <div className="flex flex-col gap-2 overflow-hidden">
            {Array.from({ length: 10 }).map((item, index) => (
              <div
                key={index}
                className="font-sembold bg-green-400 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white flex items-center justify-between transition-all "
              >
                <p>shamim</p>
                <CiMenuKebab />
              </div>
            ))}
          </div>
        </Sider>

        <Content className="relative">
          <div className="absolute bottom-4 left-2 w-full flex items-center gap-3">
            <TextArea
              rows={4}
              className="w-full"
              placeholder="Write text..."
              allowClear
            />
            <Button type="primary" size="large">
              Send
            </Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Message;
