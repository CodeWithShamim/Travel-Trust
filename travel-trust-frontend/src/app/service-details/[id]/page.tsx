import ServiceDetails from "@/views/ServiceDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel service details",
};

const ServicePage = () => {
  return (
    <>
      <ServiceDetails />
    </>
  );
};

export default ServicePage;
