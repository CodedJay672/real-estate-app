"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useToast } from "@/hooks/use-toast";
import { MdUploadFile } from "react-icons/md";

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.endpoint}/api/imagekit`);

    if (!res.ok) {
      const errorTxt = await res.text();
      throw new Error(`Failed to authenticate: ${errorTxt}`);
    }

    const { token, expire, signature } = await res.json();

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Something went wrong: ${error.message}`);
  }
};

const FileUploader = ({
  onFieldChange,
}: {
  onFieldChange: (filePath: string) => void;
}) => {
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const onSuccess = (res: any) => {
    setFile(res);
    onFieldChange(res.filePath);
    toast({
      title: "Success",
      description: `${res.filePath} uploaded successfully.`,
    });
  };

  const onError = (error: any) => {
    toast({
      title: "Error",
      description: `${error.message}`,
      variant: "destructive",
    });
    console.log(error);
  };

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={fileUploadRef}
        onSuccess={onSuccess}
        onError={onError}
        folder={"/product-listings"}
      />

      <button
        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-light-200 rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          if (fileUploadRef) {
            fileUploadRef.current?.click();
          }
        }}
      >
        <MdUploadFile size={24} />
        <span className="text-base text-light-100">click to upload file</span>
      </button>
      {file && (
        <IKImage
          path={file?.filePath}
          alt={file?.filePath}
          width={500}
          height={250}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUploader;
