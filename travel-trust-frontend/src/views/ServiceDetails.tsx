"use client";
import { useParams, useRouter } from "next/navigation";

import { IBooking, IReview, IService } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Input,
  Pagination,
  PaginationProps,
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
import { ShareAltOutlined } from "@ant-design/icons";
import { TravelCategory } from "@/constants/service";
import CustomSelect from "@/components/ui/CustomSelect";
import { motion } from "framer-motion";
import { imageVariants } from "@/utils/motion";
import FormInput from "@/components/forms/FormInput";
import { Controller, SubmitHandler, useFormContext } from "react-hook-form";
import Form from "@/components/forms/Form";
import { reviewsLists, serviceDetailsLists } from "@/data/service";
import ReviewCard from "@/components/ui/ReviewCard";
import MouseScroll from "@/components/common/MouseScroll";
import styles from "@/styles/common.module.css";

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

  const [ratings, setRatings] = useState<number[]>([5, 3, 4, 5, 5]);
  const [types, setTypes] = useState<string>("");
  const [ticket, setTicket] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);

  query["serviceId"] = id;
  query["page"] = currentPage;
  query["limit"] = limit;
  const { data: reviewsData, isLoading: reviewLoading } = useGetAllReviewQuery({
    ...query,
  });

  const user = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();

  // add service booking
  const handleServiceBooking = async () => {
    if (!user?.id) {
      router.push("/login");
      return;
    }

    if (!date || !time || !ticket || !types) {
      return;
    }

    // const { date, time } = getTimeAndDate();
    const data: IBooking = {
      date,
      time,
      types,
      ticket,
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
  const handleAddReview: SubmitHandler<any> = async (data: any, reset: any) => {
    const reviewData: IReview = {
      ...data,
      ratings: ratings,
      userId: user?.id ?? undefined,
      serviceId: id as string,
    };

    try {
      const res: any = await createReview(reviewData);
      if (res?.data?.id) {
        message.success("Review added successfully.");
      }
    } catch (error) {
      message.error("Failed to add review.");
    } finally {
      reset();
    }
  };

  const handleRateChange = (value: number, index: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader />;
  }

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
            width={1300}
            height={300}
            className="h-[35rem] w-full object-cover"
            quality={100}
            priority
          />

          <div>
            <MouseScroll />
          </div>
          {service?.status === "upcoming" && (
            <div className="absolute inset-x-0 box-content top-1/4 m-auto text-center h-32">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-green-400 text-center drop-shadow-lg capitalize">
                {service?.status}
              </h1>
            </div>
          )}
        </motion.div>
      </div>

      {/* header details content  */}
      <section>
        <div className="bg-green-100 flex items-center justify-center w-full md:mt-[-10px] py-16 md:py-20 lg:py-24">
          <div className="max-w-[1200px] w-full mx-auto px-4 flex flex-col items-start justify-center md:flex-row  md:justify-between md:items-center">
            <div className="pb-6 md:pb-0">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-widest">
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

            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {serviceDetailsLists(service)?.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="hover:scale-125 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-gray-600 font-mono tracking-wide">
                      {item.title}
                    </h2>
                    <p className="text-xl lg:text-2xl md:tracking-widest">
                      {item.value}
                    </p>
                  </div>
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
        <Divider className="text-gray-400" />
      </section>

      {/* overview  */}
      <section className="max-w-[1200px] w-full mx-auto px-4 pb-8 md:py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-8 lg:gap-10">
          <div className="w-full md:basis-3/5">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-widest">
              Overview
            </h1>
            <p className="font-medium tracking-[1px] text-gray-500 py-4 md:py-8">
              {service.description}
            </p>
          </div>

          <div className="bg-green-100 w-full md:basis-4/12 p-4 md:p-8 rounded-md flex flex-col gap-4">
            <h1 className="text-lg font-bold tracking-widest">Booking Tour</h1>

            <CustomSelect
              placeholder="Type"
              onChange={setTypes}
              value={types ? types : null}
              optionsValue={TravelCategory}
            />
            <DatePicker
              format="YYYY-MM-DD"
              className="text-black custom-picker bg-white border-none w-full py-5 pl-10 rounded-xl"
              onChange={(date, currentDate) => setDate(currentDate)}
            />
            <TimePicker
              className="text-black custom-picker bg-white border-none w-full py-5 pl-10 rounded-xl"
              onChange={(time, currentTime) => setTime(currentTime)}
            />
            <CustomSelect
              placeholder="Choose Ticket"
              onChange={setTicket}
              value={ticket ? ticket : null}
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

      {/* show review  */}
      <section className="max-w-[1200px] mx-auto px-4 pt-8 md:pt-12 lg:pt-14">
        <div className="w-full lg:w-[80%]">
          {reviewsData?.reviews?.map((review: IReview) => (
            <ReviewCard review={review} key={review?.id} />
          ))}
        </div>
        <div>
          {Number(reviewsData?.meta?.total) > 0 ? (
            <Pagination
              current={currentPage}
              onChange={onChange}
              total={reviewsData?.meta?.total}
              defaultPageSize={limit}
              responsive
            />
          ) : null}
        </div>
      </section>

      {/* add review  */}
      <section className="max-w-[1200px] mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-4">
          Write a Review
        </h1>
        <div className="w-full lg:w-[80%]">
          <Form submitHandler={handleAddReview}>
            <div className="flex flex-col md:flex-row py-5 gap-5">
              <div className="flex flex-col gap-2 md:w-[60%]">
                <span className="bg-green-100">
                  <FormInput
                    name="name"
                    placeholder="Name"
                    type="text"
                    size="large"
                    isStyles
                  />
                </span>
                <FormInput
                  name="email"
                  placeholder="Email"
                  type="email"
                  size="large"
                  isStyles
                />
                <FormInput
                  name="reviewTitle"
                  placeholder="Review Title"
                  type="text"
                  size="large"
                  isStyles
                />
              </div>

              <div className="flex flex-col gap-3 w-full md:w-[40%]">
                {reviewsLists.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between md:px-10"
                  >
                    <p className="text-xl md:text-2xl text-gray-600 md:tracking-widest">
                      {item.name}
                    </p>
                    <Rate
                      className="text-green-400 ant-star"
                      value={ratings[index]}
                      onChange={(value) => handleRateChange(value, index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Controller
              name="comment"
              render={({ field }) => (
                <TextArea
                  rows={7}
                  placeholder="Write comment..."
                  className="bg-green-100 border-none custom-placeholder text-black"
                  {...field}
                />
              )}
            />

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={addReviewLoading}
              disabled={service?.status === "upcoming"}
              className="my-6"
            >
              <span className="font-bold text-xl uppercase">Submit Review</span>
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
