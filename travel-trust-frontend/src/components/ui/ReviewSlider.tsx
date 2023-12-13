import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Rate } from "antd";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import { IReview } from "@/types";
import { calculateAverateRating } from "@/utils/common";

const ReviewSlider = () => {
  const query: any = {};

  query["limit"] = 5;
  const { data, isLoading } = useGetAllReviewQuery({
    ...query,
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={fadeIn("down", "tween", 0.5, 0.5)}
      className="max-w-[1200px] m-auto py-16 text-center"
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-full m-auto "
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 1,
          },
          639: {
            slidesPerView: 2,
          },
          865: {
            slidesPerView: 3,
          },
        }}
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
      >
        {data?.reviews?.map((item: IReview) => (
          <SwiperSlide key={item.id}>
            <ul className="bg-white p-2 h-[200px] flex flex-col justify-center items-center rounded text-center text-gray-600 leading-snug tracking-wider shadow-sm mb-4">
              <p>{item.comment}</p>
              <Rate
                className="text-[#09ea4c]"
                disabled
                defaultValue={calculateAverateRating(item.ratings)}
              />
            </ul>

            <div>
              <h1 className="font-bold">{item.name}</h1>
              <p className="text-xs">{item.email}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default ReviewSlider;
