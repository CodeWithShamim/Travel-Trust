"use client";

import { TravelCategory, TravelDestinations } from "@/constants/service";
import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
  const [from, setFrom] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSearchService = () => {
    const data = {
      from,
      destination,
      category,
    };

    console.log({ data });

    setFrom("");
    setDestination("");
    setCategory("");
  };

  return (
    <div className="w-[80%] mx-auto backdrop-blur-md bg-white/30 p-5">
      <div className="flex items-center justify-center bg-white w-full py-6 relative shadow-2xl">
        <div className="w-full">
          <Input
            placeholder="From"
            type="text"
            allowClear
            bordered={false}
            style={{ width: "22%" }}
            className="text-black"
            onChange={(e) => setFrom(e.target.value)}
          />
          <Select
            placeholder={"Destination"}
            bordered={false}
            style={{ width: "22%" }}
            onChange={(value) => setDestination(value)}
            className="text-black"
            options={TravelDestinations.map((province: string) => ({
              label: province,
              value: province,
            }))}
          />
          <Select
            placeholder={"Category"}
            bordered={false}
            style={{ width: "22%", color: "red" }}
            onChange={(value) => setCategory(value)}
            className="text-black"
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
