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
      <Card className="w-full shadow" hoverable>
        <div className="top-0 right-0 bg-primary  text-white text-center absolute rounded-full w-8 h-8 bg-[#09ea4c]">
          <Tooltip title="Add to cart" color={colors.primary}>
            <ShoppingCartOutlined height={100} width={100} className="mt-2" />
          </Tooltip>
        </div>

        <div className="text-white">
          <Image
            src={image ?? require("@/assets/login.png")}
            alt={title}
            width={200}
            height={180}
            quality={100}
            objectFit="cover"
            priority
            className="mx-auto pb-3 w-full transition-all hover:scale-[110%] md:hover:scale-[103%]"
          />

          <Meta title={title} />
        </div>
      </Card>
    </div>
  );
};

export default NewsCard;
