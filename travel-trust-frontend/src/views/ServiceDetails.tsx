"use client";
import { useParams, useRouter } from "next/navigation";

import { IBooking, IReview, IService } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Input, Rate, Select, message } from "antd";
import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import { getTimeAndDate } from "@/utils/common";
import { getUserInfo } from "@/helpers/persist/user.persist";
import { useCreatebookingMutation } from "@/redux/api/bookingApi";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/redux/hooks";
import {
  useCreateReviewMutation,
  useGetAllReviewQuery,
} from "@/redux/api/reviewApi";

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

  const user = useAppSelector((state) => state.user?.data) as any;
  const router = useRouter();

  // add service booking
  const handleServiceBooking = async () => {
    if (!user?.id) router.push("/login");

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
    if (!user?.id) router.push("/login");

    const data: IReview = {
      comment,
      rating,
      userId: user?.id,
      serviceId: id as string,
    };

    try {
      const res: any = await createReview(data);
      console.log({ ressss: res });
      if (res?.data?.id) {
        message.success("Review added successfully.");
      }
    } catch (error) {
      message.error("Failed to add review.");
    }
  };

  if (isLoading || bookingCreateLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="h-full w-full flex flex-col mt-24 lg:flex-row items-center justify-center lg:items-start gap-8 border-b border-gray-300">
        <div className="w-full  lg:w-[50%] mx-auto">
          <Image
            src={service?.image}
            alt={service?.name}
            width={100}
            height={100}
            quality={100}
            layout="responsive"
            priority
            className="mx-auto lg:pb-3 w-full rounded"
          />
        </div>

        {/* details info  */}
        <div className="w-[93%] md:w-[40%] flex gap-10 flex-col">
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

          <Button
            type="primary"
            onClick={handleServiceBooking}
            disabled={service?.status === "upcoming"}
            loading={isLoading}
          >
            Booking Now
          </Button>
        </div>
      </div>

      {/* Add reviews  */}
      <div className="pt-16 pb-4 flex flex-col items-end justify-center">
        <TextArea
          onChange={(e) => setComment(e.target?.value)}
          rows={4}
          placeholder="Write a comment..."
        />

        <div className="flex items-center justify-center">
          <Select
            placeholder="rate"
            onChange={(value) => setRating(Number(value))}
            className="text-black mx-2 mt-2"
            value={rating}
            options={[1, 2, 3, 4, 5].map((province: number) => ({
              label: province,
              value: province,
            }))}
          />
          <Button
            type="primary"
            onClick={handleAddReview}
            loading={addReviewLoading}
            className="mt-2"
            disabled={service?.status === "upcoming"}
          >
            Review
          </Button>
        </div>
      </div>

      <div className="w-[93%] mx-auto my-20">
        <h1 className="text-3xl font-semibold text-[#09ea4c] my-6">Reviews</h1>
        {reviews?.map((review: IReview) => (
          <div key={review?.id} className="flex gap-2 flex-col mb-4">
            <div className="flex flex-col justify-center items-start w-12">
              <Image
                height={100}
                width={100}
                layout="responsive"
                className="rounded-full w-10 h-10"
                src={review?.user?.profileImage ?? ""}
                alt="user image"
              />
              <p className="font-semibold">{review?.user?.username}</p>
            </div>
            <div className="pb-5 h-20 bg-green-100 p-4 rounded overflow-hidden">
              <p>{review?.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetails;
