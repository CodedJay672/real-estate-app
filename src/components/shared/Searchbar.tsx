"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { Suspense } from "react";

const Searchbar = ({ placeholder }: { placeholder: string }) => {
  const param = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // debounced search
  const handleSearch = useDebouncedCallback((query: string) => {
    const URLSearch = new URLSearchParams(param);

    if (query) {
      URLSearch.set("query", query);
    } else {
      URLSearch.delete("query");
    }

    replace(`${pathname}?${URLSearch.toString()}`);
  }, 100);

  return (
    <Suspense
      fallback={
        <span className="text-gray-800 font-bold">Type here to search...</span>
      }
    >
      <section className="w-full flex items-center">
        <Input
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={param.get("query")?.toString()}
          placeholder={placeholder}
          className="bg-subtle-light font-light text-base p-2 rounded-md"
        />
      </section>
    </Suspense>
  );
};

export default Searchbar;
