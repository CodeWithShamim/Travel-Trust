import { FaPlane, FaUserAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BiSolidTimeFive } from "react-icons/bi";
import { IService } from "@/types";

export const serviceDetailsLists = (service: IService) => {
  return [
    {
      id: 1,
      icon: <BiSolidTimeFive size={35} color="#09ea4c" />,
      title: "Duration",
      value: "1 Week",
    },
    {
      id: 2,
      icon: <FaUserAlt size={30} color="#09ea4c" />,
      title: "Min Age",
      value: "12+",
    },
    {
      id: 3,
      icon: <FaPlane size={30} color="#09ea4c" />,
      title: "Category",
      value: service?.category ?? "Any",
    },
    {
      id: 4,
      icon: <IoLocationSharp size={35} color="#09ea4c" />,
      title: "Location",
      value: service?.location ?? "Italy",
    },
  ];
};

export const reviewsLists = [
  {
    id: 1,
    name: "Services",
  },
  {
    id: 2,
    name: "Locations",
  },
  {
    id: 3,
    name: "Amenites",
  },
  {
    id: 4,
    name: "Prices",
  },
  {
    id: 5,
    name: "Food",
  },
];
