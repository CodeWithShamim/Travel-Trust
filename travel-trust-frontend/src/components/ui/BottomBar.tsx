import { Layout, Menu } from "antd";
import React from "react";
import { IUser } from "@/types";
import { sidebarItems } from "@/constants/sidebarItems";

const { Sider } = Layout;

const BottomBar = ({ user }: { user: IUser }) => {
  return (
    <Sider
      width={window?.innerWidth}
      className="fixed z-50 bottom-0 inset-x-0 lg:hidden"
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode={"horizontal"}
        items={sidebarItems(user?.role)}
        className="w-full text-center flex items-center justify-center"
      />
    </Sider>
  );
};

export default BottomBar;
