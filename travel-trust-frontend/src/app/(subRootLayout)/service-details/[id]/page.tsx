import { config } from "@/helpers/config/envConfig";
import { IMetadataProps, IService } from "@/types";
import ServiceDetails from "@/views/ServiceDetails";
import { Metadata, ResolvingMetadata } from "next";

const fetchService = async (id: string): Promise<IService> => {
  const res = await fetch(`${config.backend_url}/service/${id}`).then((res) =>
    res.json()
  );
  const service: IService = res?.data;
  return service;
};

export async function generateMetadata(
  { params, searchParams }: IMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const service = await fetchService(id);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: service?.name,
      images: [service.image, ...previousImages],
    },
  };
}

const ServicePage = async ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  const service = await fetchService(id);

  return (
    <>
      <ServiceDetails service={service} />
    </>
  );
};

export default ServicePage;
