import {
  ServiceStatus,
  TravelCategory,
  TravelDestinations,
} from "@/constants/service";
import { Card, Input, Radio, RadioChangeEvent, Slider } from "antd";
import React, { useState } from "react";

interface IFilterSideBarProps {
  setStatus: (v: string) => void;
  setPrices: (v: number[]) => void;
  setLocation: (v: string) => void;
  setCategory: (v: string) => void;
}

const FilterSideBar = ({
  setStatus,
  setPrices,
  setLocation,
  setCategory,
}: IFilterSideBarProps) => {
  const [price, setPrice] = useState<number[]>([0, 70000]);

  const onSliderChange = (value: number[]) => {
    setPrice(value);
  };
  const onSliderAfterChange = (value: number[]) => {
    setPrices(value);
  };

  return (
    <div className="bg-white shadow-xl p-4 rounded font-thin">
      <Card size="small" title="Price Range" bordered={false}>
        <Slider
          range
          step={10}
          defaultValue={price}
          onChange={onSliderChange}
          onAfterChange={onSliderAfterChange}
          min={0}
          max={150000}
        />
        <div className="flex items-center gap-4">
          <Input value={price[0]} />
          <Input value={price[1]} />
        </div>
      </Card>

      {/* status  */}
      <Card size="small" title="By status" bordered={false}>
        <Radio.Group
          className="flex flex-col items-start"
          onChange={(e: RadioChangeEvent) => setStatus(e.target.value)}
        >
          {ServiceStatus?.map((item, index) => (
            <Radio className="py-1" key={index} value={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </Card>

      {/* Category */}
      <Card size="small" title="Category" bordered={false}>
        <Radio.Group
          className="flex flex-col items-start"
          onChange={(e: RadioChangeEvent) => setCategory(e.target.value)}
        >
          {TravelCategory?.map((item, index) => (
            <Radio className="py-1" key={index} value={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </Card>

      {/* Location  */}
      <Card size="small" title="Location" bordered={false}>
        <Radio.Group
          className="flex flex-col items-start"
          onChange={(e: RadioChangeEvent) => setLocation(e.target.value)}
        >
          {TravelDestinations?.map((item, index) => (
            <Radio className="py-1" key={index} value={item}>
              {item}
            </Radio>
          ))}
        </Radio.Group>
      </Card>
    </div>
  );
};

export default FilterSideBar;
