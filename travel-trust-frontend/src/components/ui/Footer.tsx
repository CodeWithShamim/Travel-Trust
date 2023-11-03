/* eslint-disable react/jsx-key */
"use client";

import { Button, Col, Divider, Input, Row } from "antd";
import React from "react";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
import { footerLinks } from "@/data/common";
import Link from "next/link";
import styles from "@/styles/footer.module.css";

const items = [
  {
    id: 1,
    icon: <PhoneOutlined className="h-full" />,
    title: "Call us",
    value: "+88017-6281-2568",
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
    <div
      className={`${styles["background-image"]} p-4 bg-[#01220b] text-[#FFF] text-center shadow-2xl font-serif`}
    >
      <div className="max-w-[1200px] mx-auto pt-10">
        <Row className="flex gap-4 flex-col md:flex-row w-full">
          {items.map((item, index) => (
            <Col key={index} xs={24} lg={7} className="flex">
              <div className="bg-[#14c74a] text-white w-8 md:w-10 lg:w-12 h-6 md:h-10 lg:h-12 justify-center items-center">
                {item.icon}
              </div>
              <div className="text-left pl-4">
                <p className="font-bold text-md capitalize">{item.title}</p>
                <p className="text-gray-300">{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>

        <div className="flex flex-col md:flex-row gap-5 my-10 justify-between text-left">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold underline">Quick Links</h1>
            {footerLinks[0].map((item) => (
              <Link
                className="text-gray-100 no-underline font-semibold"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold underline">Our Community</h1>
            {footerLinks[1].map((item) => (
              <Link
                className="text-gray-100 no-underline font-semibold"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="text-left flex flex-col gap-4">
            <h1 className="text-xl font-bold">Subscribe</h1>
            <p>
              Sign up for our monthly blogletter to stay informed about travel
              and tours
            </p>
            <div className="flex">
              <Input placeholder="Email" className="border-none rounded-none" />
              <Button type="primary" size="large" className="rounded-none">
                <span className="font-bold text-lg">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>

        <Divider style={{ backgroundColor: "#09ea4c" }}></Divider>
        <div className="text-left">©2023 TravelTrust. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
