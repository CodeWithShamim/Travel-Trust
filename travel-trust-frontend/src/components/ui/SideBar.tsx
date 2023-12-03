"use client";

import { useEffect, useState } from "react";
import { Button, Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import HomeBackButton from "./HomeBackButton";
import { IUser } from "@/types";

const { Sider } = Layout;

const SideBar = ({ user }: { user: IUser }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mobileWidth = window?.innerWidth <= 468;
    setCollapsed(mobileWidth);
    if (mobileWidth) {
      setIsMobile(true);
    }
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={isMobile ? 20 : 200}
      style={{
        backgroundColor: "#FFFFFF",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <div className="text-center ml-0 pt-2">
        <HomeBackButton />
      </div>

      {isMobile || (
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
      )}

      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode={"inline"}
        items={sidebarItems(user?.role)}
      />
    </Sider>
  );
};

export default SideBar;
