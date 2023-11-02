"use client";

import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
