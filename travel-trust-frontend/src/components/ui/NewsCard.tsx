"use client";
import Image from "next/image";
import { Card, Tooltip } from "antd";
import React from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import colors from "@/constants/colors";

const { Meta } = Card;

const NewsCard = ({ news }: any) => {
  const { title, source, image, description, date } = news;

  return (
    <div className="w-full mx-auto flex justify-center">
      <Card className="w-full shadow custom-card" hoverable>
        <div className="text-white">
          <Image
            src={image ?? require("@/assets/login.png")}
            alt={title}
            width={200}
            height={180}
            quality={100}
            objectFit="cover"
            priority
            className="mx-auto card-img pb-3 w-full"
          />

          <Meta title={title} />
        </div>
      </Card>
    </div>
  );
};

export default NewsCard;
