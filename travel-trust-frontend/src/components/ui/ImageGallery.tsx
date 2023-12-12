import { galleryItems } from "@/data/common";
import { useBlurDataURL } from "@/redux/hooks";
import Image from "next/image";
import React from "react";

interface IImageGallery {
  item: {
    id: number;
    url: string;
  };
}
const styles = {
  card: {
    gridRowEnd: "span 26",
  },
};

const ImageGallery = ({ item }: IImageGallery) => {
  const { blurDataURL, isLoading } = useBlurDataURL(item?.url);

  return (
    <div
      key={item?.id}
      className="w-full mb-5 break-inside-avoid relative imgGalleryContent"
    >
      {blurDataURL && (
        <Image
          src={item.url}
          alt="gallery image"
          width={100}
          height={100}
          className="rounded-xl max-w-full cursor-pointer"
          style={styles.card}
          objectFit="cover"
          layout="responsive"
          loading="lazy"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      )}

      <div className="absolute hover-effect inset-0 bg-black opacity-40 transition-all rounded-xl mb-2"></div>
    </div>
  );
};

export default ImageGallery;
