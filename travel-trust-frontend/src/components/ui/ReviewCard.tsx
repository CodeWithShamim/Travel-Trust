import { reviewsLists } from "@/data/service";
import { Divider, Rate } from "antd";
import Image from "next/image";
import React from "react";
import defaultImage from "@/assets/login.webp";
import { IReview } from "@/types";

type IReviewCardProps = {
  review: IReview;
};

const ReviewCard = ({ review }: IReviewCardProps) => {
  const inputDate = new Date(review?.createdAt as string);

  const options: {} = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = inputDate.toLocaleDateString("en-US", options);

  return (
    <div className="pb-4 md:pb-8">
      <div className="flex gap-6 items-center">
        <Image
          width={80}
          height={80}
          src={review?.user?.profileImage ?? defaultImage}
          className="rounded-full"
          alt="review user"
        />
        <div>
          <h2 className="font-bold capitalize text-xl lg:text-2xl tracking-wide text-gray-700">
            {review?.name ? review.name : review?.user?.username}
          </h2>
          <p className="text-lg text-green-500 font-medium pt-2">
            {formattedDate}
          </p>
        </div>
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 capitalize pt-4 md:pt-8">
        {review?.reviewTitle}
      </h1>
      <p className="font-medium tracking-[1px] lg:max-w-[70%] text-gray-500 py-6 md:py-8">
        {review?.comment}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-[80%] lg:w-[70%]">
        {reviewsLists.map((item, index) => (
          <div
            key={index}
            className="flex justify-between md:justify-start items-center gap-3"
          >
            <h3 className="text-xl text-gray-600 tracking-widest">
              {item.name}
            </h3>

            <Rate
              className="text-green-400 ant-star"
              value={review?.ratings[index]}
              disabled
            />
          </div>
        ))}
      </div>

      <Divider />
    </div>
  );
};

export default ReviewCard;
