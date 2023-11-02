import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { reviewsItems } from "@/data/reviews";
import { Rate } from "antd";

const ReviewSlider = () => {
  return (
    <div className="max-w-[1200px] m-auto py-16 text-center">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="w-[75%] m-auto "
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
        {reviewsItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white p-2 h-[200px] flex flex-col justify-center items-center rounded text-center text-gray-600 leading-snug tracking-wider shadow-sm mb-4">
              <p>{item.review}</p>
              <Rate
                className="text-[#09ea4c]"
                disabled
                defaultValue={item.rating}
              />
            </div>

            <div>
              <h1 className="font-bold">{item.name}</h1>
              <p className="text-xs">{item.destination}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
