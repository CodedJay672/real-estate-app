"use client";

import React, { useRef, useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/next';
import config from "@/lib/config";
import FileDropzone from "./FileDropzone";
import Image from "next/image";


// helper function to authenticate users before uploading assets
const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.prodEndpoint}/api/imagekit`);

    if (!res.ok) {
      const errorTxt = await res.text();
      throw new Error(`Failed to authenticate: ${errorTxt}`);
    }

    const { token, expire, signature, publicKey } = await res.json();
    return { token, expire, signature, publicKey };
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    throw new Error("Failed to authenticate user.")
  }
};

const FileUploader = ({
  onFieldChange,
}: {
  onFieldChange: (filePath: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState('');
  const [progress, setProgress] = useState<number | null>(null);


  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }

    const controller = new AbortController();
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: `IMG_${Date.now()}.${file.name.split(".").pop()}`,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: controller.signal,
      });
      console.log("Upload response:", uploadResponse);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  }

  return (
    <div className="w-full h-32 rounded-lg border border-primary">
      <FileDropzone onFileChangeAction={setFile} setImgUrlAction={setImgUrl} />
      <button
        className="w-full p-2 border-2 border-dashed border-light-200 rounded-lg"

      >
        <div className="flex justify-center items-center w-full">
          <MdUploadFile size={24} />
          <span className="text-base text-light-100">
            click to {file ? "change" : "upload"} file
          </span>
        </div>
        <div className="w-full mt-2 flex flex-col items-center justify-center">
          {progress !== null && (
            <progress
              value={progress}
              max="100"
              className="w-full h-4 mt-2 bg-subtle-light rounded-lg"
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default FileUploader;
