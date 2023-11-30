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
        autoplaySpeed={10}
        speed={10}
        onReady={() => console.log("I am ready")}
      >
        {sponsorItems?.map((item) => (
          <div key={item?.id} className="h-32 w-28 cursor-pointer">
            <Image
              src={item?.image}
              alt={"sponsor image"}
              width={120}
              height={120}
              layout="responsive"
              loading="lazy"
              objectFit="cover"
            />
          </div>
        ))}
      </ScrollCarousel>
    </>
  );
};

export default SponsorCarousel;
