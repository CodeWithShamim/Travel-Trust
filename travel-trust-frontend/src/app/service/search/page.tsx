"use client";

import Loading from "@/app/loading";
import FilterSideBar from "@/components/ui/FilterSideBar";
import Loader from "@/components/ui/Loader";
import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { IService } from "@/types";
import { Input, Select } from "antd";
import Image from "next/image";
import { useState } from "react";

const { Option } = Select;

const SearchPage = () => {
  const query: any = {};
  const searchData = useAppSelector((state) => state.service?.search) as any;

  const [status, setStatus] = useState<string>("");
  const [location, setLocation] = useState<string>(searchData?.destination);
  const [category, setCategory] = useState<string>(
    searchData?.category ?? "any"
  );
  const [searchTerm, setSearchTerm] = useState<string>(searchData?.from);

  if (location) {
    query["location"] = location;
  }
  if (category) {
    query["category"] = category;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, error } = useGetAllServiceQuery({ ...query });

  const services = data?.services as any;

  return (
    <div className="max-w-[1200px] mx-auto p-4 flex items-start flex-row">
      <div className="basis-1/4">
        <FilterSideBar
          setStatus={setStatus}
          setLocation={setLocation}
          setCategory={setCategory}
        />
      </div>

      <div className="w-full">
        <div className="m-4 p-4 flex items-center justify-between bg-white shadow-sm">
          <Input
            placeholder="Search"
            type="text"
            allowClear
            className="text-black md:w-[30%] h-8 rounded-md border-neutral-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            <span>Sort by : </span>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              // onChange={(value: string)=> setPrice(value)}
              options={[
                { value: "", label: "Default" },
                { value: 0, label: "Low to High" },
                { value: 1500000, label: "High to Low" },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center p-4">
          {services?.slice(0, 12)?.map((service: IService, index: number) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {isLoading && <Loading />}

        {services?.length === 0 ? (
          <div className="text-center w-full flex flex-col justify-center items-center">
            <div>
              <h3 className="text-red-600 text-center text-2xl">
                Ups!... no results found
              </h3>
              <p>Please try another search</p>
            </div>
            <Image
              src={require("@/assets/search-not-found.webp")}
              width={300}
              className="mt-4 px-4"
              alt="search not found"
              objectFit="cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
