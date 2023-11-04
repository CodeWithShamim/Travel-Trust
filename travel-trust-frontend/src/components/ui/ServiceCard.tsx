"use client";
import { IService } from "@/types";
import Image from "next/image";
import { Card, Rate, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import colors from "@/constants/colors";
import { useAppDispatch } from "@/redux/hooks";
import { addServiceToCart } from "@/redux/slices/serviceSlice";
import { motion } from "framer-motion";

const { Meta } = Card;

interface ServiceCardProps {
  service: IService;
  loading?: boolean;
}

const ServiceCard = ({ service, loading }: ServiceCardProps) => {
  const { id, name, price, image, category, status } = service;
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addServiceToCart(service));
  };

  return (
    <motion.div className="w-full mx-auto flex justify-center">
      <Card
        className="w-full h-[200px] shadow custom-card"
        loading={loading}
        hoverable
      >
        <div
          onClick={handleAddToCart}
          className="top-0 right-0 bg-primary z-20 text-white text-center absolute rounded-full w-8 h-8 bg-[#09ea4c]"
        >
          <Tooltip title="Add to cart" color={colors.primary}>
            <ShoppingCartOutlined height={100} width={100} className="mt-2" />
          </Tooltip>
        </div>

        <Link href={`/service-details/${id}`} className="text-white">
          <Image
            src={image ?? require("@/assets/login.png")}
            alt={name}
            width={200}
            height={215}
            quality={100}
            // layout="responsive"
            objectFit="cover"
            priority
            className="mx-auto card-img pb-3 w-full absolute inset-0"
          />
          <h1 className="absolute text-white font-extrabold text-2xl text-left shadow-sm">
            {name}
          </h1>

          <div className="card-content flex gap-2 shadow-sm p-2">
            <p className=" font-bold">Category: {category}</p>
            <p className=" font-bold">Price: {price}$</p>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
