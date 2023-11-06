"use client";
import Image from "next/image";
import { Card, Tooltip } from "antd";
import React from "react";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/motion";

const { Meta } = Card;

type INewsCard = {
  news: any;
  index?: number;
};

const NewsCard = ({ news, index = 0 }: INewsCard) => {
  const { title, source, image, description, date } = news;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={slideIn("left", "spring", index * 0.2, 0.5)}
      className="w-full mx-auto flex justify-center"
    >
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
            className="mx-auto pb-3 w-full"
          />

          <Meta title={title} />
        </div>
      </Card>
    </motion.div>
  );
};

export default NewsCard;
