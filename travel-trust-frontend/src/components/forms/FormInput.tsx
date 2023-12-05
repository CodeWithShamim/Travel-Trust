"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  isStyles?: boolean;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  defaultValue,
  placeholder,
  disabled,
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
              disabled={disabled}
              {...field}
              value={value ? value : field.value}
              defaultValue={defaultValue}
              className={`${isStyles && " custom-placeholder py-4"}`}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
