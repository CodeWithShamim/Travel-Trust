"use client";

import React, { useEffect, useState } from "react";
import { Input, Row, Col, Card, Form, Upload, message, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useUploadImage } from "@/utils/upload";
import { BiUpload } from "react-icons/bi";
import Image from "next/image";
import {
  ServiceStatus,
  TravelCategory,
  serviceFieldrules,
} from "@/constants/service";

const { Dragger } = Upload;

const beforeUpload = (file: any) => {
  // if (file.type === "jpg" || file.type === "png" || file.type === "jpeg") {
  // } else {
  //   message.error("You can only upload image file!");
  //   return;
  // }
  const isLt20M = file.size / 1024 / 1024 < 20;

  if (!isLt20M) {
    message.error("Image must smaller than 20MB!");
    return;
  }
  return isLt20M;
};

const fileUploadProps = {
  name: "image",
  showUploadList: false,
};

interface IGeneralField {
  setImageUrl: (value: any) => void;
}

const GeneralField = ({ setImageUrl }: IGeneralField) => {
  const { handleUpload, imageUrl, uploadLoading } = useUploadImage();

  useEffect(() => {
    if (imageUrl) {
      setImageUrl(imageUrl);
    }
  }, [imageUrl, setImageUrl]);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Name" rules={serviceFieldrules.title}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={serviceFieldrules.description}
          >
            <Input.TextArea rows={8} placeholder="Description" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={serviceFieldrules.price}
              >
                <Input placeholder="Price" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={serviceFieldrules.location}
              >
                <Input placeholder="Location" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Dragger
            {...fileUploadProps}
            customRequest={(e: any) => {
              handleUpload(e.file, e.onSuccess, e.onError);
            }}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={280}
                height={150}
                alt="avatar"
                className="h-[150px] w-full object-cover"
              />
            ) : (
              <div>
                <BiUpload size={40} />
                <p>Click or drag file to upload</p>
              </div>
            )}

            {uploadLoading && (
              <div className="z-50">
                <LoadingOutlined className="font-size-xxl text-primary" />
                <div className="mt-3">Uploading video...</div>
              </div>
            )}
          </Dragger>
        </Card>
        <Card title="Organization">
          <Form.Item
            name="category"
            label="Category"
            rules={serviceFieldrules.category}
          >
            <Select className="w-100" placeholder="Category">
              {TravelCategory.map((elm, index) => (
                <option key={index} value={elm}>
                  {elm}
                </option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select className="w-100" placeholder="Status">
              {ServiceStatus.map((elm, index) => (
                <option key={index} value={elm}>
                  {elm}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
