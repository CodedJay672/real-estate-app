"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

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
    <section className="w-full flex items-center">
      <Input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={param.get("query")?.toString()}
        placeholder={placeholder}
        className="bg-subtle-light font-light text-base p-2 rounded-md"
      />
    </section>
  );
};

export default Searchbar;
