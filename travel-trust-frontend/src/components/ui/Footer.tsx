"use client";

import { Col, Divider, Row } from "antd";
import React from "react";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const items = [
  {
    id: 1,
    icon: <PhoneOutlined className="h-full" />,
    title: "Call us",
    value: "+88017-00-1111",
  },
  {
    id: 2,
    icon: <MailOutlined className="h-full" />,
    title: "Write to us",
    value: "shamimislamonline@gmail.com",
  },
  {
    id: 3,
    icon: <HomeOutlined className="h-full" />,
    title: "Address",
    value: "Taragonj-5420, Rangpur, Bangladesh",
  },
];

const Footer = () => {
  return (
    <div className="bg-[#01220b] p-4 text-[#FFFFFF] text-center">
      <div className="max-w-[1200px] mx-auto pt-10">
        <Row className="flex gap-4 flex-col md:flex-row w-full">
          {items.map((item, index) => (
            <Col key={index} xs={24} lg={8} className="flex">
              <div className="bg-[#14c74a]  w-8 md:w-10 lg:w-12 h-6 md:h-10 lg:h-12 justify-center items-center rounded-sm">
                {item.icon}
              </div>
              <div className="text-left pl-4">
                <p className="font-bold text-sm lg:text-xl">{item.title}</p>
                <p className="text-[#e6e5e5]">{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Divider style={{ backgroundColor: "#09ea4c" }}></Divider>
        <div className="text-left">©2023 TravelTrust. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
