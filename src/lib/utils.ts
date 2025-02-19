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
  const anHourAgo = diff / (60000 * 60000);

  if (rightNow < 1) {
    return "posted rigt now";
  } else if (fewMins < 60) {
    return "posted few minutes ago";
  } else if (anHourAgo < 24) {
    return anHourAgo < 2
      ? "posted an hour ago"
      : `posted ${anHourAgo} hours ago`;
  } else {
    return `posted ${new Date(date).getFullYear}/${new Date(date).getMonth}/${
      new Date(date).getSeconds
    }`;
  }
}

export function getYear() {
  return new Date().getFullYear();
}
