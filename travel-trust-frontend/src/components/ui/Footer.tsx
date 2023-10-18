"use client";

import { Col, Divider, Row } from "antd";
import React from "react";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="bg-[#1ea398] py-4 text-[#FFFFFF] text-center">
      <div className="max-w-[1000px] mx-auto pt-10">
        <Row>
          <Col xs={24} lg={8} className="flex">
            <div className="bg-[#33d8d0]  w-12 h-12 justify-center items-center">
              <PhoneOutlined className="h-full" />
            </div>
            <div className="text-left pl-4">
              <p className="font-bold text-xl">Call us</p>
              <p className="text-[#e6e5e5]">+88017-00-1111</p>
            </div>
          </Col>
          <Col xs={24} lg={8} className="flex">
            <div className="bg-[#33d8d0] w-12 h-12 justify-center items-center ">
              <MailOutlined className="h-full" />
            </div>
            <div className="text-left pl-4">
              <p className="font-bold text-xl">Write to us</p>
              <p className="text-[#e6e5e5]">shamimislamonline@gmail.com</p>
            </div>
          </Col>
          <Col xs={24} lg={8} className="flex">
            <div className="bg-[#33d8d0]  w-12 h-12 justify-center items-center">
              <HomeOutlined className="h-full" />
            </div>
            <div className="text-left pl-4">
              <p className="font-bold text-xl">Address</p>
              <p className="text-[#e6e5e5]">
                Taragonj-5420, Rangpur, Bangladesh
              </p>
            </div>
          </Col>
        </Row>
        <Divider style={{ backgroundColor: "#25dbcf" }}></Divider>
        <div className="text-left">©2023 TravelTrust. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
