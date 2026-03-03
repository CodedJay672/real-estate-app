"use client";

import { exportToExcel } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props<T> {
  data: T[];
  label: string;
}

const ExportButton = <T,>({ data, label }: Props<T>) => {

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => exportToExcel(data, label, "sheet1")}
      className="text-sm md:text-base h-9 text-light-50 bg-primary hover:bg-dark-200 hover:text-light-100 cursor-pointer"
    >
      <FileIcon className="size-4" />
      <span className="hidden sm:inline-block">Export</span>
    </Button>
  );
};

export default ExportButton;