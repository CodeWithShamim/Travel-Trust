import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types";
import { sidebarItems } from "@/constants/sidebarItems";

const { Sider } = Layout;

const BottomBar = ({ user }: { user: IUser }) => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (window) {
      setWidth(window?.innerWidth);
    }
  }, []);

  return (
    <Sider
      // width={window?.innerWidth}
      width={width}
      className="fixed z-50 bottom-0 left-0 right-0 lg:hidden "
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
