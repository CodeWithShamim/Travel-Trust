"use client";

import { TravelCategory, TravelDestinations } from "@/constants/service";
import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { addSearchData } from "@/redux/slices/serviceSlice";
import Loader from "./Loader";

const SearchBar = () => {
  const [from, setFrom] = useState<string>("");
  const [destination, setDestination] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const { data: services, isLoading, error } = useGetAllServiceQuery(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSearchService = () => {
    const data = {
      from,
      destination,
      category,
    };

    if (from || destination || category) {
      dispatch(addSearchData(data));
      router.push("/service/search");
    }

    setFrom("");
    setDestination(null);
    setCategory(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="z-50 hidden md:block w-full mx-auto backdrop-blur-md bg-white/30 p-5">
      <div className="flex items-center justify-center bg-white w-full py-6 relative shadow-2xl">
        <div className="w-full">
          <Input
            placeholder="From"
            type="text"
            allowClear
            bordered={false}
            style={{ width: "22%" }}
            className="text-black"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <Select
            placeholder="Destination"
            bordered={false}
            style={{ width: "22%", color: "#000" }}
            onChange={(value) => setDestination(value)}
            className="text-black"
            value={destination}
            options={TravelDestinations.map((province: string) => ({
              label: province,
              value: province,
            }))}
          />
          <Select
            placeholder="Category"
            bordered={false}
            style={{ width: "22%", color: "#000" }}
            onChange={(value) => setCategory(value)}
            className="text-black"
            value={category}
            // dropdownStyle={{
            //   backgroundColor: "#09ea4c",
            // }}
            // suffixIcon={<DownOutlined />}
            options={TravelCategory.map((province: string) => ({
              label: province,
              value: province,
            }))}
          />
        </div>

        <Button
          className="absolute right-0 top-0 bottom-0 "
          type="primary"
          icon={<SearchOutlined />}
          style={{
            width: "22%",
            height: 70.8,
            borderRadius: "0px",
          }}
          onClick={handleSearchService}
        >
          Search Now
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
