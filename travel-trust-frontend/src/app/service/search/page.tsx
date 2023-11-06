"use client";

import Loader from "@/components/ui/Loader";
import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useAppSelector } from "@/redux/hooks";
import { IService } from "@/types";
import Image from "next/image";

const SearchPage = () => {
  const query: any = {};
  const searchData = useAppSelector((state) => state.service?.search) as any;
  const location = searchData?.destination;
  const category = searchData?.category || "any";
  const searchTerm = searchData?.from;

  if (location) {
    query["location"] = location;
  }
  if (category) {
    query["category"] = category;
  }
  if (searchTerm) {
    query["searchTerm"] = searchTerm;
  }

  const {
    data: services,
    isLoading,
    error,
  } = useGetAllServiceQuery({ ...query });

  console.log(isLoading);

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <SearchBar />

      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
          {services?.slice(0, 12)?.map((service: IService, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>

      {services?.length === 0 ? (
        <div className="text-center w-full flex flex-col justify-center items-center">
          <div>
            <h3 className="text-red-600 text-center text-2xl">
              Ups!... no results found
            </h3>
            <p>Please try another search</p>
          </div>
          <Image
            src={require("@/assets/search-not-found.png")}
            width={300}
            className="mt-4 px-4"
            alt="search not found"
            objectFit="cover"
          />
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;
