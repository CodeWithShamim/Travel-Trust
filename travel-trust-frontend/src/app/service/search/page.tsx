"use client";

import Loading from "@/app/loading";
import FilterSideBar from "@/components/ui/FilterSideBar";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import { IService } from "@/types";
import { Button, Drawer, Input, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import { BiFilter, BiReset } from "react-icons/bi";

const SearchPage = () => {
  const query: any = {};
  const searchData = useAppSelector((state) => state.service?.search) as any;

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");
  const [prices, setPrices] = useState<number[]>([]);
  const [location, setLocation] = useState<string>(searchData?.destination);
  const [category, setCategory] = useState<string>(searchData?.category);
  const [searchTerm, setSearchTerm] = useState<string>(searchData?.from);
  const [sortBy, setSortBy] = useState<string>("");

  if (status) {
    query["status"] = status;
  }
  if (prices[0]) {
    query["minPrice"] = prices[0];
  }
  if (prices[1]) {
    query["maxPrice"] = prices[1];
  }
  if (location) {
    query["location"] = location;
  }
  if (category) {
    query["category"] = category;
  }
  if (sortBy) {
    query["sortBy"] = "price";
    query["sortOrder"] = sortBy === "lh" ? "asc" : "desc";
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

  const handleReset = () => {
    setStatus("");
    setPrices([]);
    setLocation("");
    setCategory("");
    setSearchTerm("");
    setSortBy("");
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 flex items-start flex-row">
      {/* Filter  */}
      <div>
        <div className="hidden lg:block basis-1/4">
          <FilterSideBar
            setStatus={setStatus}
            setPrices={setPrices}
            setLocation={setLocation}
            setCategory={setCategory}
          />
        </div>
        <div>
          <Drawer
            title="Filters"
            placement="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <FilterSideBar
              setStatus={setStatus}
              setPrices={setPrices}
              setLocation={setLocation}
              setCategory={setCategory}
            />
          </Drawer>
        </div>
      </div>

      <div className="w-full">
        {/* Filter & search header  */}
        <div className="px-4 lg:m-4 lg:py-4 flex gap-4 flex-col lg:flex-row lg:items-center justify-between bg-white shadow-sm">
          <div className="flex items-center md:w-[50%] lg:w-[30%]">
            <Input
              placeholder="Search"
              type="text"
              allowClear
              className="text-black mr-6 lg:mr-0 h-10 lg:h-8 rounded-md border-neutral-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="lg:hidden">
              <span className="flex items-center">
                <h4>{`Filter`}</h4>
                <Button
                  size="small"
                  className="border-0"
                  onClick={() => setDrawerOpen(true)}
                  icon={<BiFilter size={26} className="text-green-400" />}
                />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <span className="flex items-center">
                <h4>{`Reset all : `}</h4>
                <Button
                  size="small"
                  className="border-0"
                  onClick={handleReset}
                  icon={<BiReset size={22} className="text-green-400" />}
                />
              </span>
            </div>

            <div>
              <span>Sort by : </span>
              <Select
                defaultValue=""
                style={{ width: 160 }}
                onChange={(value: string) => setSortBy(value)}
                options={[
                  { value: "", label: "Price >> Default" },
                  { value: "lh", label: "Price >> Low to High" },
                  { value: "hl", label: "Price >> High to Low" },
                ]}
              />
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="z-50">
            <Loading />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center p-4">
          {isLoading ||
            services
              ?.slice(0, 20)
              ?.map((service: IService, index: number) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
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
