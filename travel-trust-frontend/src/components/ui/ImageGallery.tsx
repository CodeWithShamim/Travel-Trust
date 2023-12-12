import { galleryItems } from "@/data/common";
import Image from "next/image";
import React from "react";

const styles = {
  card: {
    gridRowEnd: "span 26",
  },
};

const ImageGallery = () => {
  return (
    <div className="galleryLayout rounded-xl">
      {galleryItems?.map((item, index) => (
        <div
          key={index}
          className="w-full mb-5 break-inside-avoid relative imgGalleryContent"
        >
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
            // placeholder="blur"
          />

          <div className="absolute hover-effect inset-0 bg-black opacity-40 transition-all rounded-xl mb-2"></div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
