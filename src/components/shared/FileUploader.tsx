"use client";

import { useEffect, useState } from "react";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from '@imagekit/next';
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import { deleteProductImage } from "@/lib/actions/images.actions";
import config from "@/lib/config";
import { generateErrorMessage } from "@/lib/utils";
import { useProductProvider } from "../providers/StoreProvider";
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
  value,
  onFieldChange,
  imageId,
}: {
  value: string;
  imageId: string;
  onFieldChange: (filePath: string) => void;
}) => {
  const [progress, setProgress] = useState<number | null>(null);
  const { setIsDeleting, setIsUploading, productImageId, setProductImageId } = useProductProvider((state) => state);

  const router = useRouter();
  const query = useSearchParams().get('productId');

  // initialize the image Id
  useEffect(() => {
    if (!imageId) return;

    setProductImageId(imageId);
  }, []);

  const handleUpload = async (file: File) => {

    let authParams;
    setIsUploading();
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }

    const controller = new AbortController();
    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        folder: 'product-listings',
        file,
        fileName: `IMG_${Date.now()}.${file.name.split(".").pop()}`,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        abortSignal: controller.signal,
      });
      console.log("Upload response:", uploadResponse);

      // set the imagekit filepath
      if (uploadResponse.filePath) onFieldChange(uploadResponse.filePath)

      // set the image Id
      if (uploadResponse.fileId)
        setProductImageId(uploadResponse.fileId)
      router.refresh()
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
    } finally {
      setIsUploading();
    }
  }

  const handleDelete = async () => {
    setIsDeleting();
    try {
      const res = await deleteProductImage(productImageId, query);

      if (!res.success) toast({
        title: "Failed.",
        description: res.message,
        variant: 'destructive'
      })

      onFieldChange('');
    } catch (error) {
      toast({
        title: "Error",
        description: generateErrorMessage(error),
        variant: 'destructive'
      })
    } finally {
      setIsDeleting();
    }
  }

  return (
    <div className="w-full h-52 flex-center flex-col relative">
      <FileDropzone onFileChangeAction={handleUpload} imgUrl={value} onRemoveAction={handleDelete} />
      <div className="w-full mt-2 flex flex-col items-center justify-center">
        {progress !== null && (
          <progress
            value={progress}
            max="100"
            className="w-full h-2 mt-2 bg-green-500 rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default FileUploader;
