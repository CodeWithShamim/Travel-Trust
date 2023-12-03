import { Divider } from "antd";
import Link from "next/link";
import React from "react";
import { BiArrowFromRight } from "react-icons/bi";

const HomeBackButton = () => {
  return (
    <Link
      href="/"
      className="text-xl md:text-xl text-center lg:text-2xl font-extrabold shadow-2xl uppercase text-[#09ea4c] z-50"
    >
      Travel Trust
      <Divider />
    </Link>
  );
};

export default HomeBackButton;
