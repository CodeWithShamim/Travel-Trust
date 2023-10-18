"use client";

import ServiceCard from "@/components/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import React from "react";

const HomePage = () => {
  const { data: services, isLoading, error } = useGetAllServiceQuery(null);

  console.log({ error });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center py-6">
        {services?.slice(0, 8)?.map((service: IService) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
