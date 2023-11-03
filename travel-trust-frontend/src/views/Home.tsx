"use client";

import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import MapView from "@/components/ui/MapView";
import NewsCard from "@/components/ui/NewsCard";
import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { newses } from "@/data/news";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import { Button, Carousel, Divider, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/home.module.css";
import ReviewSlider from "@/components/ui/ReviewSlider";
import VideoPlayer from "@/components/ui/VideoPlayer";

const HomePage = () => {
  const query: any = {};
  query["limit"] = 20;
  const {
    data: services,
    isLoading,
    error,
  } = useGetAllServiceQuery({ ...query });

  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);

  const availableService = services?.filter(
    (service: IService) => service?.status === "available"
  );
  const upcomingService = services?.filter(
    (service: IService) => service?.status === "upcoming"
  );

  return (
    <div className="w-full">
      {/* Hero section  */}
      <div className="relative top-[-65px] left-0 right-0">
        <Carousel effect="fade" autoplay={true} className="z-[-1]">
          {[1, 2, 3].map((item: number) => (
            <div className="h-screen w-full" key={item}>
              <Image
                src={require(`@/assets/banner${item}.jpg`)}
                alt="banner image"
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-[#000] opacity-40"></div>
            </div>
          ))}
        </Carousel>

        <div className="absolute bottom-1/2 left-0 right-0 max-w-[1200px] mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-extrabold uppercase text-center drop-shadow-md">
            Expore the world with travel
          </h1>
          {/* <h1>Discover the world with our guide</h1> */}
        </div>

        <div className="absolute bottom-20 left-0 right-0 max-w-[1100px] mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* services  */}
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="font-semibold text-3xl text-[#34d364]">
          Available service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {!availableService &&
            Array.from({ length: 8 }).map((n, index) => (
              <ServiceCardSkeleton key={index} />
            ))}

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
            {!upcomingService &&
              Array.from({ length: 4 }).map((n, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            {upcomingService?.slice(0, 4)?.map((service: IService) => (
              <ServiceCard
                key={service.id}
                service={service}
                loading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>

      {/* videos  */}
      <div
        className={`${styles["background-image"]} flex flex-col items-center justify-center w-full gap-4 text-center px-4 mt-12 md:mt-16 lg:mt-20`}
      >
        <Image
          src={require("@/assets/play.png")}
          width={100}
          height={100}
          objectFit="cover"
          alt="video play image"
          className="backdrop-blur-md bg-white/5 rounded-full cursor-pointer"
          onClick={() => setIsVideoPlay(true)}
        />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold shadow-2xl text-white uppercase">
          Good Time
        </h1>
        <p className="text-white text-lg uppercase">
          Plan the perfect vacations
        </p>
      </div>
      {isVideoPlay && (
        <Modal
          open={isVideoPlay}
          onCancel={() => setIsVideoPlay(false)}
          className="w-[100%] md:w-[80%] lg:w-[70%] h-[20rem] lg:h-[35rem] bg-[#09ea4c]"
          style={{ position: "relative" }}
          footer={null}
        >
          <div className="w-full h-[20rem] lg:h-[35rem] absolute inset-0">
            <VideoPlayer />
          </div>
        </Modal>
      )}

      {/* news  */}
      <div className="max-w-[1200px] mx-auto my-14 md:my-20 lg:my-24">
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

      {/* section  */}
      <div
        className={`${styles["background-image2"]} flex flex-col  my-14 md:my-16 lg:my-24 items-center justify-center w-full gap-4 text-center px-4`}
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold shadow-2xl text-white">
          Are You Still Intarested To Tour?
        </h1>
        <p className="text-white text-lg">
          Where Adventure Awaits – Explore the World with Us!
        </p>

        <Button
          type="primary"
          className="mt-6 w-48  rounded-full hover:bg-transparent hover:border-[#09ea4c] transition duration-300 ease-in-out"
          size="large"
        >
          <span className="font-bold">Book Tour</span>
        </Button>
      </div>

      {/* reviews  */}
      <div className="bg-[#F7F7F7] px-4">
        <div className="max-w-[1200px] m-auto pt-12">
          <Divider
            orientation="center"
            orientationMargin="0"
            className="border-[#00ff4c] "
          >
            <h1 className="font-semibold text-3xl text-[#34d364] text-center capitalize">
              Customer Review
            </h1>
          </Divider>
        </div>

        <ReviewSlider />
      </div>

      {/* maps  */}
      {/* <div>
        <MapView />
      </div> */}
    </div>
  );
};

export default HomePage;
