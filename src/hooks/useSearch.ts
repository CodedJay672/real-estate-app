"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSearch() {
  const param = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (filter: TFilterQuery, url?: string) => {
    const querySearch = new URLSearchParams(param);

    Object.entries(filter).map(([key, val]) => {
      if (val) {
        querySearch.set(key, val.toString());
      } else {
        querySearch.delete(key);
      }
    });

    router.replace(`${url ? url : pathname}?${querySearch.toString()}`);
  };

  function clearFilters() {
    const url = new URL(window.location.href);
    url.search = "";
    router.replace(url.toString());
  }

  return {
    handleSearch,
    clearFilters,
  };
}
