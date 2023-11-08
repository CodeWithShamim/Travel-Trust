"use client";
import { useParams, useRouter } from "next/navigation";

import { IBooking, IReview, IService } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Rate,
  Select,
  TimePicker,
  message,
} from "antd";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import { getTimeAndDate, timeAgo } from "@/utils/common";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useCreatebookingMutation } from "@/redux/api/bookingApi";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/redux/hooks";
import {
  useCreateReviewMutation,
  useGetAllReviewQuery,
} from "@/redux/api/reviewApi";

import { BiSolidTimeFive } from "react-icons/bi";
import { FaPlane, FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { DownCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { TravelCategory } from "@/constants/service";
import CustomSelect from "@/components/ui/CustomSelect";
import { motion } from "framer-motion";
import { imageVariants } from "@/utils/motion";

const { TextArea } = Input;

interface IServiceProps {
  service: IService;
}
const ServiceDetails = () => {
  const query: any = {};

  const params = useParams();
  const id = params?.id;
  const {
    data: service,
    isLoading,
    error,
  } = useGetSingleServiceQuery(id as string);
  const [createBooking, { isLoading: bookingCreateLoading }] =
    useCreatebookingMutation();
  const [createReview, { isLoading: addReviewLoading }] =
    useCreateReviewMutation();

  query["serviceId"] = id;
  const { data: reviews, isLoading: reviewLoading } = useGetAllReviewQuery({
    ...query,
  });

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [types, setTypes] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  const user = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();

  // add service booking
  const handleServiceBooking = async () => {
    if (!user?.id) {
      router.push("/login");
      return;
    }

    const { date, time } = getTimeAndDate();
    const data: IBooking = {
      date,
      time,
      userId: user?.id,
      serviceId: id as string,
    };

    try {
      const res: any = await createBooking(data);
      if (res?.data?.id) {
        message.success("Booking created successfully.");
        router?.push("/dashboard/user/bookings");
      }
    } catch (error) {
      message.error("Failed to booking.");
    }
  };

  // add review
  const handleAddReview = async () => {
    if (!user?.id) {
      router.push("/login");
      return;
    }

    const data: IReview = {
      comment,
      rating,
      userId: user?.id,
      serviceId: id as string,
    };

    try {
      const res: any = await createReview(data);
      if (res?.data?.id) {
        message.success("Review added successfully.");
      }
    } catch (error) {
      message.error("Failed to add review.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const items = [
    {
      id: 1,
      icon: <BiSolidTimeFive size={35} color="#09ea4c" />,
      title: "Duration",
      value: "1 Week",
    },
    {
      id: 2,
      icon: <FaUserAlt size={30} color="#09ea4c" />,
      title: "Min Age",
      value: "12+",
    },
    {
      id: 3,
      icon: <FaPlane size={30} color="#09ea4c" />,
      title: "Category",
      value: service?.category ?? "Any",
    },
    {
      id: 4,
      icon: <IoLocationSharp size={35} color="#09ea4c" />,
      title: "Location",
      value: service?.location ?? "Italy",
    },
  ];

  return (
    <div className="">
      <div className="overflow-hidden">
        <motion.div
          initial="hidden"
          animate="show"
          variants={imageVariants()}
          className=""
        >
          <Image
            src={service?.image}
            alt={service?.name}
            width={500}
            height={300}
            className="h-[40rem] w-full object-cover"
            quality={100}
            priority
          />
        </motion.div>
      </div>

      <section>
        <div className="bg-green-100 h-[150px] flex items-center justify-center w-full mt-[-10px]">
          <div className="max-w-[1200px] w-full mx-auto px-4 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold uppercase tracking-widest">
                {service?.name}
              </h1>
              <p>
                <span className="text-xl text-green-400 font-extrabold tracking-widest">
                  ${service?.price}
                </span>{" "}
                /{" "}
                <span className="text-gray-500 tracking-widest">
                  Per person
                </span>
              </p>
            </div>

            <div className="flex gap-16">
              {items?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="hover:scale-125 transition-all">
                    {item.icon}
                  </span>
                  <span>
                    <h2 className="text-gray-600 font-mono tracking-wide">
                      {item.title}
                    </h2>
                    <p className="text-2xl tracking-widest">{item.value}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] w-full mx-auto px-4 flex items-center justify-between py-6">
          <span className="flex items-center gap-3">
            <BiSolidTimeFive size={16} color="#09ea4c" />
            <p>Posted {timeAgo(service?.createdAt)}</p>
          </span>
          <span>
            <Button type="primary" size="small" icon={<ShareAltOutlined />}>
              Share
            </Button>
          </span>
        </div>
        <hr className="text-gray-400" />
      </section>

      <section className="max-w-[1200px] w-full mx-auto px-4 py-16">
        <div className="flex items-start justify-between gap-10">
          <div className="basis-3/5">
            <h1 className="text-3xl font-bold tracking-widest">Overview</h1>
            <p className="font-medium tracking-[1px] text-gray-500 py-8">
              {service.description}
            </p>
          </div>

          <div className="bg-green-100 basis-4/12 p-8 rounded-md flex flex-col gap-4">
            <h1 className="text-lg font-bold tracking-widest">Booking Tour</h1>
            <CustomSelect
              placeholder="Type"
              onChange={setTypes}
              value={types}
              optionsValue={TravelCategory}
            />
            <DatePicker
              format="YYYY-MM-DD"
              className="text-black custom-picker bg-white border-none w-full py-5 pl-10 rounded-xl"
            />
            <TimePicker className="text-black custom-picker bg-white border-none w-full py-5 pl-10 rounded-xl" />
            <CustomSelect
              placeholder="Choose Ticket"
              onChange={setTicket}
              value={ticket}
              optionsValue={TravelCategory}
            />

            <Button
              type="primary"
              onClick={handleServiceBooking}
              disabled={service?.status === "upcoming"}
              loading={bookingCreateLoading}
              className="w-full"
              size="large"
            >
              <span className="text-xl font-bold">Booking Now</span>
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4"></div>
    </div>
  );
};

export default ServiceDetails;
