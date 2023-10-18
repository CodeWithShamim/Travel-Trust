"use client";
import { useParams } from "next/navigation";

import { IService } from "@/types";
import Image from "next/image";
import React from "react";
import { Button, Rate } from "antd";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";

interface IServiceProps {
  service: IService;
}
const ServiceDetails = () => {
  const params = useParams();
  const id = params?.id;
  const {
    data: service,
    isLoading,
    error,
  } = useGetSingleServiceQuery("ab6c4203-da34-43c9-853d-943f169dc94b");

  console.log({ isLoading });
  console.log({ service });
  console.log({ error });

  return (
    <div>
      <div className="h-full xl:h-screen flex flex-col lg:flex-row items-center lg:items-start gap-8 border-b border-gray-300">
        <div className="w-full  lg:w-[50%] mx-auto">
          <Image
            src={service?.image}
            alt={service?.name}
            width={100}
            height={100}
            quality={100}
            layout="responsive"
            priority
            className="mx-auto lg:pb-3 w-full"
          />
        </div>

        {/* details info  */}
        <div className="w-[93%] md:w-[40%]">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold lg:pt-10">
            {service?.name}
          </h1>

          <p>{service?.description}</p>

          <div className="pb-2">
            <span className="font-bold">Category:</span> {service?.category}
          </div>

          <div>
            <p className="md:text-xl font-bold text-primary">
              <span className="font-bold text-black">Price:</span>{" "}
              {service?.price}$
            </p>

            <p
              className={`font-bold text-red-500 ${
                service?.status === "Out of Stock" && "line-through"
              }`}
            >
              <span className="font-bold text-black">Status:</span>{" "}
              {service?.status}
            </p>
          </div>
          {/* 
          <div className="flex items-center h-8">
            <p className="text-sm font-bold">Individual Rating: </p>
            <Rate
              disabled
              defaultValue={individualRating}
              allowHalf
              className="pl-2 pb-1 text-xs md:text-sm"
            />
          </div> */}

          {/* 
          <div>
            <h4 className="text-sm">Key Features:</h4>
            <ul className="text-lg">
              {Object.entries(keyFeatures as Object)?.map(([key, value]) => (
                <li className="text-xs md:text-sm" key={key}>
                  {value}
                </li>
              ))}
            </ul>
          </div> */}

          <Button type="primary">Buy Now</Button>
        </div>
      </div>

      {/* reviews  */}
      {/* <div>
        <h1 className=" pt-6 md:pt-0 md:pb-2 text-lg md:text-xl">
          Recent reviews
        </h1>
        {reviews?.map((review) => (
          <>
            <div className="flex items-center justify-start w-full gap-2">
              <div className="flex flex-col justify-center items-start w-12">
                <div className="avatar">
                  <div className="w-6 h-6 rounded-full">
                    <Image
                      height={100}
                      width={100}
                      layout="responsive"
                      src="/favicon.ico"
                      alt="user image"
                    />
                  </div>
                </div>
                <p className="font-serif text-[12px] md:text-[14px]">
                  {review?.username}
                </p>
              </div>
              <p className="font-serif pb-5 max-w-4xl">{review?.comment}</p>
            </div>
            <hr className="w-full" />
          </>
        ))}
      </div> */}
    </div>
  );
};

export default ServiceDetails;
