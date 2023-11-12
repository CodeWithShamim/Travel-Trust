"use client";

import { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import { useAppSelector } from "@/redux/hooks";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user: any = useAppSelector((state) => state.user.data);

  useEffect(() => {
    setCollapsed(window?.innerWidth <= 400);
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <div className="flex items-center justify-evenly">
        <h3 className="font-semibold text-gray-400">
          {collapsed || "Hide menu"}
        </h3>
        <Button
          type="text"
          icon={
            collapsed ? (
              <BsArrowRight className="text-green-400" size={25} />
            ) : (
              <BsArrowLeft className="text-green-400" size={25} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>

      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(user?.role)}
      />
    </Sider>
  );
};

export default SideBar;
