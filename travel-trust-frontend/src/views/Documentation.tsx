'use client';

import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import MainHeader from '@/components/ui/Header';
import { docs } from '@/data/docs';

const { Header, Sider, Content } = Layout;

export default function Documentation() {
  const [selectedKey, setSelectedKey] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = Object.keys(docs).map((key) => ({
    key,
    label: docs[key].title,
  }));

  return (
    <div>
      <MainHeader />

      <Layout className="!min-h-screen">
        <Sider
          width={250}
          className="!bg-gray-50"
          breakpoint="lg" // lg = 992px, adjust as needed
          collapsedWidth={0} // hide sidebar on small screens
          collapsed={collapsed}
          onCollapse={(collapsedStatus) => setCollapsed(collapsedStatus)}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={menuItems}
          />
        </Sider>

        <Layout>
          <Header className="!bg-white !shadow !px-4 !flex !items-center !justify-between">
            <div className="flex items-center gap-4">
              {/* Toggle button for mobile */}
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="lg:hidden" // hide on large screens
              />
              <h1 className="!text-lg !font-semibold">Travel Trust Documentation</h1>
            </div>
          </Header>

          <Content className="p-4 sm:p-8 bg-gray-100 prose z-10 max-w-[1200px">
            <h2 className="text-2xl">{docs[selectedKey].title}</h2>
            {docs[selectedKey].content}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
