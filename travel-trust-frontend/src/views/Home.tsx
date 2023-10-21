"use client";

import NewsCard from "@/components/ui/NewsCard";
import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { newses } from "@/data/news";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import { Carousel, Divider } from "antd";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  const query: any = {};
  query["limit"] = 20;
  const {
    data: services,
    isLoading,
    error,
  } = useGetAllServiceQuery({ ...query });

  const availableService = services?.filter(
    (service: IService) => service?.status === "available"
  );
  const upcomingService = services?.filter(
    (service: IService) => service?.status === "upcoming"
  );

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

      {/* services  */}
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-semibold text-3xl text-[#34d364]">
          Available service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {!availableService && <p>Loading...</p>}
          {availableService?.slice(0, 8)?.map((service: IService) => (
            <ServiceCard
              key={service.id}
              service={service}
              loading={isLoading}
            />
          ))}
        </div>

        <div className="mt-20">
          <h1 className="font-semibold text-3xl text-[#34d364]">
            Upcoming service
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
            {!upcomingService && <p>Loading...</p>}
            {upcomingService?.slice(0, 4)?.map((service: IService) => (
              <ServiceCard
                key={service.id}
                service={service}
                loading={isLoading}
              />
            ))}
          </div>
        </div>

        {/* news  */}
        <div className="mt-20">
          <Divider
            orientation="center"
            orientationMargin="0"
            className="border-[#00ff4c]"
          >
            <h1 className="font-semibold text-3xl text-[#34d364] text-center capitalize">
              Latest news
            </h1>
          </Divider>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
            {newses?.slice(0, 8)?.map((news: any) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
