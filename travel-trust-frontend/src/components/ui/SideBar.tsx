"use client";

import { useState } from "react";
import { Button, Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IUser } from "@/types";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

const SideBar = ({ user }: { user: IUser }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const defaultKey = usePathname();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={200}
      style={{
        backgroundColor: "#FFFFFF",
        // position: "sticky",
      }}
      className="hidden lg:block"
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
        defaultSelectedKeys={[defaultKey]}
        mode={"inline"}
        items={sidebarItems(user?.role)}
      />
    </Sider>
  );
};

export default SideBar;
