import ServiceDetails from "@/pages/ServiceDetails";
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
