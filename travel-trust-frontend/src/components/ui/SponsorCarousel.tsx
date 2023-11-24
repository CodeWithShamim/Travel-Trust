"use client";

import { sponsorItems } from "@/data/common";
import Image from "next/image";
import React from "react";
import ScrollCarousel from "scroll-carousel-react";

const SponsorCarousel = () => {
  return (
    <>
      <ScrollCarousel
        autoplay
        autoplaySpeed={8}
        speed={7}
        onReady={() => console.log("I am ready")}
      >
        {sponsorItems?.map((item) => (
          <div
            key={item?.id}
            className="bg-blue-300/20 border-2 border-blue-300/70 rounded h-32 w-48 cursor-pointer"
          >
            <Image
              src={item?.image}
              alt={"sponsor image"}
              width={150}
              height={150}
              layout="responsive"
              loading="lazy"
              objectFit="cover"
              className="mx-auto card-img pb-3 w-full absolute inset-0"
            />
          </div>
        ))}
      </ScrollCarousel>
    </>
  );
};

export default SponsorCarousel;
