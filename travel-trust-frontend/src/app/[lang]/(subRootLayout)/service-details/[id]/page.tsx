import { config } from "@/helpers/config/envConfig";
import { IMetadataProps, IService } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";

const ServiceDetails = dynamic(() => import("@/views/ServiceDetails"));

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
      description: service?.description,
      images: [service.image, ...previousImages],
    },
  };
}

const ServicePage = async ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  const service = await fetchService(id);

  return (
    <div>
      <ServiceDetails service={service} />
    </div>
  );
};

export default ServicePage;
