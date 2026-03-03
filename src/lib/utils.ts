import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "@e965/xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateErrorMessage(error: unknown) {
  let message = "Something went wrong.";

  if (error instanceof Error && error.message) message = error.message;
  return message;
}

export const exportToExcel = <T = unknown>(
  data: T[],
  fileName: string,
  sheetName: string,
) => {
  // 1. Create a new workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
