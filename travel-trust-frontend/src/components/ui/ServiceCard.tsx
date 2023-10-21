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
    <div className="w-full mx-auto flex justify-center">
      <Card className="w-full shadow" loading={loading} hoverable>
        <div
          onClick={handleAddToCart}
          className="top-0 right-0 bg-primary  text-white text-center absolute rounded-full w-8 h-8 bg-[#09ea4c]"
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
            height={180}
            quality={100}
            layout="responsive"
            objectFit="cover"
            priority
            className="mx-auto pb-3 w-full transition-all hover:scale-[110%] md:hover:scale-[103%]"
          />

          <Meta title={name} />
          {/* <Meta
            title={
              <span className="md:text-lg font-bold text-primary">
                {price}$
              </span>
            }
            description={status}
          /> */}
        </Link>
      </Card>
    </div>
  );
};

export default ServiceCard;
