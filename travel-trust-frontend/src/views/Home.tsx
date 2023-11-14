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
import { fadeIn, imageVariants, textVariant } from "@/utils/motion";
import { useScroll } from "framer-motion";
import { UpOutlined } from "@ant-design/icons";
import ImageGallery from "@/components/ui/ImageGallery";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const query: any = {};
  query["limit"] = 20;
  const { data, isLoading, error } = useGetAllServiceQuery({ ...query });

  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);

  const router = useRouter();

  const services = data?.services as any;

  const availableService = services?.filter(
    (service: IService) => service?.status === "available"
  );
  const upcomingService = services?.filter(
    (service: IService) => service?.status === "upcoming"
  );

  return (
    <div className="w-full">
      {/* <motion.div className="progress-bar" style={{ scaleX }} /> */}
      <div>
        <FloatButton.BackTop
          shape="circle"
          type="primary"
          style={{
            right: 24,
          }}
          icon={<UpOutlined />}
        />
      </div>

      {/* Hero section  */}
      <div className="relative top-[-65px] left-0 right-0">
        <Carousel
          effect="fade"
          autoplay={true}
          className="z-[-1] overflow-hidden"
        >
          {[1, 2, 3].map((item: number) => (
            <motion.div
              initial="hidden"
              animate="show"
              variants={imageVariants()}
              className="h-screen w-full"
              key={item}
            >
              <Image
                src={require(`@/assets/banner${item}.webp`)}
                alt="banner image"
                className="w-full h-screen object-cover"
                priority
                quality={100}
                objectFit="cover"
                layout="responsive"
              />
              <div className="absolute inset-0 bg-[#000] opacity-30"></div>
            </motion.div>
          ))}
        </Carousel>

        <div className="absolute bottom-[35%] md:bottom-[45%] lg:bottom-1/2 text-center left-0 right-0 max-w-[1200px] mx-auto">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeIn("down", "tween", 0, 1.5)}
            className="custom-head-text px-4 text-6xl lg:text-8xl tracking-wide text-white font-extrabold uppercase text-center drop-shadow-md"
          >
            Expore the world with <span className="fancy">Travel</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "tween", 0, 1.5)}
            className="custom-sub-text hero-banner__stroked-title text-center text-white text-2xl lg:text-3xl tracking-[1px] capitalize font-semibold pt-10"
          >
            Where would you like to go?
          </motion.p>
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
          variants={textVariant(0.4)}
          className="font-bold text-3xl md:uppercase text-[#34d364] tracking-widest"
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
            variants={textVariant(0.4)}
            className="font-bold text-3xl md:uppercase text-[#34d364] tracking-widest"
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
          className="blinking-animation"
        >
          <Image
            src={require("@/assets/play.webp")}
            width={100}
            height={100}
            objectFit="cover"
            alt="video play image"
            className="backdrop-blur-md bg-white/10 rounded-full cursor-pointer"
            layout="responsive"
            loading="lazy"
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
      <div className="max-w-[1200px] mx-auto px-4 my-14 md:my-20 lg:my-24">
        <Divider
          orientation="left"
          orientationMargin="0"
          className="border-[#00ff4c]"
        >
          <motion.h1
            initial="hidden"
            whileInView="show"
            variants={textVariant(0.4)}
            className="font-bold text-3xl md:uppercase text-[#34d364] tracking-widest"
          >
            Latest news
          </motion.h1>
        </Divider>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {newses?.slice(0, 8)?.map((news: any, index: number) => (
            <NewsCard key={index} news={news} index={index} />
          ))}
        </div>
      </div>

      {/* gallery  */}
      <div className="max-w-[1200px] mx-auto px-4 pb-10 md:pb-14 lg:pb-20">
        <Divider
          orientation="left"
          orientationMargin="0"
          className="border-[#00ff4c]"
        >
          <motion.h1
            initial="hidden"
            whileInView="show"
            variants={textVariant(0.4)}
            className="font-bold text-3xl md:uppercase text-[#34d364] tracking-widest"
          >
            Photo Gallery
          </motion.h1>
        </Divider>

        <ImageGallery />
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
          onClick={() => router.push("/service/search")}
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
              variants={textVariant(0.4)}
              className="font-bold text-3xl md:uppercase text-[#34d364] tracking-widest"
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

      <div className={`${styles["background-image3"]} hidden md:block`}></div>
    </div>
  );
};

export default HomePage;
