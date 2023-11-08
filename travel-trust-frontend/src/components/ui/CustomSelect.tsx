import { DownCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Select } from "antd";

type ICustomSelect = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string | null;
  optionsValue: any;
};

const CustomSelect = ({
  placeholder,
  onChange,
  value,
  optionsValue,
}: ICustomSelect) => {
  return (
    <Select
      placeholder={placeholder}
      bordered={false}
      onChange={(value: string) => onChange(value)}
      className="text-black bg-white custom-select w-full p-8 rounded-xl"
      value={value}
      suffixIcon={<DownCircleOutlined />}
      options={optionsValue.map((province: string) => ({
        label: province,
        value: province,
      }))}
    />
  );
};

export default CustomSelect;
