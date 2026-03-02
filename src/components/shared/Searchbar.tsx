"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";


const Searchbar = ({ placeholder, url }: { placeholder: string; url?: string }) => {
  const param = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [queryTerm, setQueryTerm] = useState("");

  // debounced search
  const handleSearch = () => {
    const URLSearch = new URLSearchParams(param);

    if (queryTerm) {
      URLSearch.set("query", queryTerm);
    } else {
      URLSearch.delete("query");
    }

    replace(`${url ? url : pathname}?${URLSearch.toString()}`);
  };



  return (
    <section className="size-full flex-between gap-2">
      <Input
        type="text"
        onChange={(e) => setQueryTerm(e.target.value)}
        defaultValue={param.get("query")?.toString()}
        placeholder={placeholder}
        className="w-full h-12 md:h-14 text-base p-2 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none"
      />
      <Button type="button" size="sm" onClick={handleSearch} className="size-10 bg-accent-bright hover:bg-accent-brown cursor-pointer text-dark-200 rounded-full">

        <Search className="size-7" />
      </Button>
    </section>
  );
};

export default Searchbar;
