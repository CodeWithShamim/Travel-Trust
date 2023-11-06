"use client";

import ServiceCardSkeleton from "@/components/skeletons/ServiceCardSkeleton";
import MapView from "@/components/ui/MapView";
import NewsCard from "@/components/ui/NewsCard";
import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { newses } from "@/data/news";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import { Button, Carousel, Divider, FloatButton, Modal } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "@/styles/home.module.css";
import ReviewSlider from "@/components/ui/ReviewSlider";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { motion } from "framer-motion";
import { fadeIn, slideIn, textVariant } from "@/utils/motion";
import { useScroll, useSpring } from "framer-motion";
import { UpOutlined } from "@ant-design/icons";

const HomePage = () => {
  const query: any = {};
  query["limit"] = 20;
  const {
    data: services,
    isLoading,
    error,
  } = useGetAllServiceQuery({ ...query });

  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  const availableService = services?.filter(
    (service: IService) => service?.status === "available"
  );
  const upcomingService = services?.filter(
    (service: IService) => service?.status === "upcoming"
  );

  return (
    <div className="w-full">
      {/* Float Button  */}
      <motion.div className="progress-bar" style={{ scaleX }} />
      <FloatButton.BackTop
        shape="circle"
        type="primary"
        style={{
          right: 24,
        }}
        icon={<UpOutlined />}
      />

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
          <motion.h1
            initial="hidden"
            animate="show"
            variants={slideIn("left", "tween", 0.5, 0.8)}
            className="text-4xl md:text-6xl lg:text-8xl text-white font-extrabold uppercase text-center drop-shadow-md"
          >
            Expore the world with travel
          </motion.h1>
          {/* <h1>Discover the world with our guide</h1> */}
        </div>

        <motion.div className="absolute bottom-20 left-0 right-0 max-w-[1100px] mx-auto">
          <SearchBar />
        </motion.div>
      </div>

      {/* services  */}
      <motion.div className="max-w-[1200px] mx-auto px-4">
        <motion.h1
          initial="hidden"
          whileInView="show"
          variants={textVariant(0.3)}
          className="font-semibold text-3xl text-[#34d364]"
        >
          Available service
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {!availableService &&
            Array.from({ length: 8 }).map((n, index) => (
              <ServiceCardSkeleton key={index} />
            ))}

          {availableService
            ?.slice(0, 8)
            ?.map((service: IService, index: number) => (
              <ServiceCard
                key={service.id}
                service={service}
                loading={isLoading}
                index={index}
              />
            ))}
        </div>

        <div className="mt-10 md:mt-14 lg:mt-20">
          <motion.h1
            initial="hidden"
            whileInView="show"
            variants={textVariant(0.3)}
            className="font-semibold text-3xl text-[#34d364]"
          >
            Upcoming service
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
            {!upcomingService &&
              Array.from({ length: 4 }).map((n, index) => (
                <ServiceCardSkeleton key={index} />
              ))}
            {upcomingService
              ?.slice(0, 4)
              ?.map((service: IService, index: number) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  loading={isLoading}
                  index={index}
                />
              ))}
          </div>
        </div>
      </motion.div>

      {/* videos  */}
      <motion.div
        className={`${styles["background-image"]} flex flex-col items-center justify-center w-full gap-4 text-center px-4 mt-12 md:mt-16 lg:mt-20`}
        // style={{ scale: scrollYProgress }}
      >
        <motion.span
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
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
        </motion.span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold shadow-2xl text-white uppercase">
          Good Time
        </h1>
        <p className="text-white text-lg uppercase">
          Plan the perfect vacations
        </p>
      </motion.div>
      {isVideoPlay && (
        <Modal
          open={isVideoPlay}
          onCancel={() => setIsVideoPlay(false)}
          className="w-[100%] md:w-[80%] lg:w-[70%] h-[20rem] lg:h-[35rem] bg-[#000]"
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
          <motion.h1
            initial="hidden"
            whileInView="show"
            variants={textVariant(0.3)}
            className="font-semibold text-3xl text-[#34d364] text-center capitalize"
          >
            Latest news
          </motion.h1>
        </Divider>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {newses?.slice(0, 8)?.map((news: any, index: number) => (
            <NewsCard key={news.id} news={news} index={index} />
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
            <motion.h1
              initial="hidden"
              whileInView="show"
              variants={textVariant(0.3)}
              className="font-semibold text-3xl text-[#34d364] text-center capitalize"
            >
              Customer Review
            </motion.h1>
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
