"use client";
import Image from "next/image";
import errorImage from "@/assets/error.png";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-[#FD27A8] text-2xl font-bold">
        Something went wrong!!!
      </h1>
      <Image
        src={errorImage}
        objectFit="cover"
        width={280}
        alt="not found image"
      />
    </div>
  );
};

export default Error;
