"use client";

import { Layout, Button, MenuProps, Dropdown, Space, Avatar } from "antd";
import Link from "next/link";
import React from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const { Header: HeaderLayout } = Layout;
const items: MenuProps["items"] = [];

const Header = () => {
  return (
    <HeaderLayout className="px-4 md:px-24 lg:px-32 text-white flex items-center justify-between">
      <div className="md:text-xl">
        <Link href="/" className="text-primary font-bold">
          Travel Trust
        </Link>
      </div>

      {/* dropdoan list  for tablet & desktop*/}
      <Dropdown menu={{ items }} className="hidden md:flex">
        <Space className="font-medium hover:cursor-pointer">
          Categories
          <DownOutlined />
        </Space>
      </Dropdown>

      <div className="flex gap-2 items-center">
        {/* for tablet & desktop */}
        <Link href="/tool/pc-builder" className="hidden md:block">
          <Button type="primary" className="text-xs md:text-sm">
            PC Builder
          </Button>
        </Link>

        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                size="large"
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Space>
          </a>
        </Dropdown>

        {/* login / logout button  */}
        {true ? (
          <Button
            //   onClick={() => signOut()}
            type="primary"
            className="bg-primary text-xs md:text-sm"
          >
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button type="primary" className="bg-primary text-xs md:text-sm">
              Signin
            </Button>
          </Link>
        )}
      </div>
    </HeaderLayout>
  );
};

export default Header;
