"use client";

import { useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { Image, ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/next';
import config from "@/lib/config";
import FileDropzone from "./FileDropzone";


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
  const [productImg, setProductImg] = useState('');
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
    <div className="w-full h-32 flex-center flex-col rounded-lg border border-border relative">
      <FileDropzone onFileChangeAction={setFile} setImgUrlAction={setProductImg} />
      <div className="w-full mt-2 flex flex-col items-center justify-center">
        {progress !== null && (
          <progress
            value={progress}
            max="100"
            className="w-full h-4 mt-2 bg-subtle-light rounded-lg"
          />
        )}
      </div>

    </div>
  );
};

export default FileUploader;
