"use client";

import { sponsorItems } from "@/data/common";
import Image from "next/image";
import React from "react";
import ScrollCarousel from "scroll-carousel-react";

const SponsorCarousel = () => {
  return (
    <div>
      <ScrollCarousel autoplay autoplaySpeed={7} speed={7}>
        {sponsorItems?.map((item) => (
          <Image
            key={item?.id}
            src={item?.image}
            alt={"sponsor image"}
            width={150}
            height={150}
            layout="responsive"
            objectFit="cover"
            className="cursor-pointer h-24 w-24 md:h-32 md:w-32"
          />
        ))}
      </ScrollCarousel>
    </div>
  );
};

export default SponsorCarousel;
