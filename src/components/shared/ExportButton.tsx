"use client";

import { FileIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { exportToExcel } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props<T> {
  data: T[];
  label: string;
}

const ExportButton = <T,>({ data, label }: Props<T>) => {
  const [exportBtnElement, setexportBtnElement] = useState<HTMLElement | null>(null);


  useEffect(() => {
    if (exportBtnElement) return;

    const exportBtn = document.getElementById("export-btn");
    if (exportBtn) setexportBtnElement(exportBtn);
  }, [])

  if (!exportBtnElement) return null;

  return (
    <>
      {createPortal(
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => exportToExcel(data, label, "sheet1")}
          className="text-sm md:text-base h-9 text-light-50 bg-primary hover:bg-dark-200 hover:text-light-100 cursor-pointer"
        >
          <FileIcon className="size-4" />
          <span className="hidden sm:inline-block">Export</span>
        </Button>,
        exportBtnElement
      )}

    </>
  );
};

export default ExportButton;