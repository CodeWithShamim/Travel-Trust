"use client";
import { IService } from "@/types";
import Image from "next/image";
import { Card, Rate } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const { Meta } = Card;

interface ServiceCardProps {
  service: IService;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, name, price, image, category, status } = service;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) setLoading(false);
  }, [id]);

  return (
    <div className="w-full mx-auto flex justify-center">
      <Card className="w-full shadow" loading={loading} hoverable>
        {Number(price) > 100 && (
          <div className="top-0 right-0 bg-primary text-white w-24 text-center absolute rounded-sm">
            50% off
          </div>
        )}
        <Link href={`/service-details/${id}`} className="text-white">
          <Image
            src={image ?? require("@/assets/banner.jpg")}
            alt={name}
            width={200}
            height={180}
            quality={100}
            layout="responsive"
            objectFit="cover"
            priority
            className="mx-auto pb-3 w-full transition-all hover:scale-[110%] md:hover:scale-[110%] lg:hover:scale-[120%]"
          />

          <Meta
            title={name}
            description={<div className="pb-2">{category}</div>}
          />
          <Meta
            title={
              <span className="md:text-lg font-bold text-primary">
                {price}$
              </span>
            }
            description={status}
          />

          {/* <div className="pt-1">
            <Rate
              disabled
              defaultValue={rating}
              allowHalf
              className="text-xs"
            />
            <span style={{ marginLeft: 8 }}>{rating}</span>
          </div> */}
        </Link>
      </Card>
    </div>
  );
};

export default ServiceCard;
