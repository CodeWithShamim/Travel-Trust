import { DownCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

type ICustomSelect = {
  placeholder?: string;
  value?: string | null;
  onChange: (value: string) => void;
  optionsValue: any;
  defaultValue?: string;
  style?: any;
  disabled?: boolean;
};

const CustomSelect = ({
  placeholder,
  value,
  onChange,
  defaultValue,
  optionsValue,
  style,
  disabled = false,
}: ICustomSelect) => {
  return (
    <Select
      placeholder={placeholder}
      bordered={false}
      style={{ ...style }}
      className="text-black bg-white custom-select w-full py-6 rounded-xl"
      defaultValue={defaultValue}
      onChange={(value) => onChange(value)}
      value={value}
      disabled={disabled}
      suffixIcon={<DownCircleOutlined />}
      options={optionsValue.map((province: string, index: number) => ({
        label: province,
        value: province,
      }))}
    />
  );
};

export default CustomSelect;
