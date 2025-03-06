import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  if (!name) return;

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatTime(date: Date | undefined) {
  if (!date) return;

  const dateInMS = date.getTime();
  const now = Date.now();

  const diff = now - dateInMS;

  const rightNow = diff / 1000;
  const fewMins = diff / 60000;
  const anHourAgo = diff / 3600000;

  if (rightNow < 1) {
    return "posted Just now";
  } else if (fewMins < 60) {
    return "posted few minutes ago";
  } else if (anHourAgo < 24) {
    return anHourAgo < 2
      ? "posted an hour ago"
      : `posted ${Math.floor(anHourAgo)} hours ago`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `posted on ${day}/${month}/${year}`;
  }
}

export function getYear() {
  return new Date().getFullYear();
}
