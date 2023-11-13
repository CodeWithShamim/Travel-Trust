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
        <div key={index} className="w-full mb-5 break-inside-avoid relative">
          <Image
            src={item.url}
            alt="gallery image"
            className="rounded-xl max-w-full"
            style={styles.card}
            objectFit="cover"
            layout="responsive"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
