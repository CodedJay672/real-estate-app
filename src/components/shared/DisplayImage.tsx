"use client";

import config from "@/lib/config";
import { IKImage } from "imagekitio-next";

const DisplayImage = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
  return (
    <IKImage
      path={imageUrl}
      alt={alt}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      width={960}
      height={600}
      loading="lazy"
    />
  );
};

export default DisplayImage;
