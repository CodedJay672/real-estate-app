"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Back = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="size-9 md:size-10 bg-white hover:bg-light-100/50 group transition-colors cursor-pointer rounded-full"
    >
      <ArrowLeft size={20} className="size-4 md:size-5 text-dark-100 group-hover:text-dark-200 transition-colors" />
    </Button>
  );
};

export default Back;
