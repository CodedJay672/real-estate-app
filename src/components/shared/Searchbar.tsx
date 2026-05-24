"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { use, useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useSearch from "@/hooks/useSearch";

interface SearchBarProps {
  getCategories: Promise<ApiResponse<{
    id: string;
    name: string;
  }[]>>;
  url?: string;
}

const Searchbar = ({ url, getCategories }: SearchBarProps) => {
  const { handleSearch } = useSearch();
  const param = useSearchParams();
  const [filter, setFilter] = useState<TFilterQuery>({
    category: param.get("category") ?? "",
    price: param.get("price") ? Number(param.get("price")) : null,
    baths: param.get("baths") ? Number(param.get("baths")) : null,
    beds: param.get("beds") ? Number(param.get("beds")) : null,
  });

  const allCategories = use(getCategories);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(filter, url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto rounded-xl md:rounded-full border border-border bg-white p-3 md:px-1.5 md:py-1 shadow-2xl backdrop-blur-xl">
      <div className="size-full flex flex-col md:grid md:grid-cols-8 gap-3 md:gap-1 items-end">
        <div className="w-full md:col-span-4 h-12 md:h-full">
          <Select value={filter.category} onValueChange={(value) => setFilter({ ...filter, category: value })}>
            <SelectTrigger className="w-full h-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg md:rounded-s-full px-4 font-medium text-base md:text-sm">
              <SelectValue placeholder="Property type" className="truncate" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.data && allCategories.data.length > 0 ? (
                allCategories.data.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="font-medium">
                    {cat.name}
                  </SelectItem>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center">No categories available</p>
              )}
            </SelectContent>
          </Select>
        </div>

        <Input
          type="number"
          min={0}
          value={filter.price ?? ""}
          onChange={(event) => setFilter({ ...filter, price: event.target.value ? Number(event.target.value) : null })}
          placeholder="Min. price"
          className="w-full h-12 md:h-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg md:rounded-none px-4 font-medium text-base md:text-sm"
        />

        <div className="flex w-full gap-3 md:contents">
          <Input
            type="number"
            min={0}
            value={filter.beds ?? ""}
            onChange={(event) => setFilter({ ...filter, beds: event.target.value ? Number(event.target.value) : null })}
            placeholder="Beds"
            className="w-full h-12 md:h-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg md:rounded-none px-4 font-medium text-base md:text-sm flex-1"
          />

          <Input
            type="number"
            min={0}
            value={filter.baths ?? ""}
            onChange={(event) => setFilter({ ...filter, baths: event.target.value ? Number(event.target.value) : null })}
            placeholder="Baths"
            className="w-full h-12 md:h-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 rounded-lg md:rounded-none px-4 font-medium text-base md:text-sm flex-1"
          />
        </div>

        <Button type="submit" variant="secondary" size="sm" className="w-full h-12 md:h-full md:flex-1 rounded-lg md:rounded-e-full md:rounded-s-none flex items-center justify-center p-0 bg-linear-to-r from-[#f5c344] to-[#b88f3a] hover:opacity-90 text-[#0f172a] font-bold text-base md:text-sm transition-all shadow-md border-none">
          <Search size={20} className="mr-2 md:mr-1" /> Search
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;
