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

const TIMEOUT_MS = 10_000;

export const safeFetch = async (
  urlEndpoint: string,
  options: RequestInit = {},
  timeOut: number = TIMEOUT_MS,
) => {
  // abort controller
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeOut);

  try {
    // make request
    const response = await fetch(urlEndpoint, {
      ...options,
      signal: abortController.signal,
    });

    return response;
  } finally {
    clearTimeout(id);
  }
};
