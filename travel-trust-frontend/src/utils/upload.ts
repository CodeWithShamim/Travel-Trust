import { config } from "@/helpers/config/envConfig";
import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

export const useUploadImage = () => {
  const [imageUrl, setImageurl] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const cloudName = config.cloud_name;
  const uploadPreset = config.upload_preset;

  const handleUpload = async (
    file: RcFile,
    onSuccess: () => void,
    onError: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset as string);
      formData.append("cloud_name", cloudName as string);

      setUploadLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        setImageurl && setImageurl(imageUrl);
      } else {
        onError();
        message.error("Image upload failed.");
      }

      onSuccess();
    } catch (error) {
      onError();
      console.log("Error uploading image:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  return { handleUpload, imageUrl, uploadLoading };
};
