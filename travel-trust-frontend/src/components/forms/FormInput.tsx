"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  isStyles?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  placeholder,
  label,
  isStyles = false,
}: IInput) => {
  const { control } = useFormContext();

  return (
    <>
      <span className="text-left w-full mt-2">{label ? label : null}</span>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              className={`${
                isStyles && "bg-green-100 border-0 custom-placeholder py-6"
              }`}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
