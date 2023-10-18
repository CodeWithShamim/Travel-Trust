"use client";

import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  const { data: services, isLoading, error } = useGetAllServiceQuery(null);

  return (
    <div>
      {/* Hero section  */}
      <div className="relative top-[-65px] left-0 right-0">
        <Carousel effect="fade" autoplay={true}>
          {[1, 2, 3].map((item: number) => (
            <div className="h-screen w-full" key={item}>
              <Image
                src={require(`@/assets/banner${item}.jpg`)}
                alt="banner image"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[#000] opacity-40"></div>
            </div>
          ))}
        </Carousel>

        <div className="absolute bottom-1/2 left-0 right-0 max-w-[80%] mx-auto">
          <h1 className="text-3xl md:text-6xl lg:text-8xl text-white font-extrabold uppercase text-center drop-shadow-md">
            Expore the world with travel
          </h1>
          {/* <h1>Discover the world with our guide</h1> */}
        </div>

        <div className="absolute bottom-20 left-0 right-0">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {services?.slice(0, 8)?.map((service: IService) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
