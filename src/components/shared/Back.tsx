"use client";

import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();

  return (
    <div
      className="px-4 py-2 bg-white rounded-md flex gap-1 items-center cursor-pointer shadow-md hover:shadow-lg transition-all"
      onClick={() => router.back()}
    >
      <MdArrowBack size={20} className="text-gray-500" />

      <span className="text-gray-500">Back</span>
    </div>
  );
};

export default Back;
