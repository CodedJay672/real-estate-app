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
    <form onSubmit={handleSubmit} className="w-full max-w-6xl md:h-16 mx-auto rounded-lg md:rounded-full border border-border bg-white px-1.5 py-1 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl">
      <div className="size-full grid grid-cols-6 md:grid-cols-8 gap-1 items-end">
        <div className="col-span-6 md:col-span-4 h-full">
          <Select value={filter.category} onValueChange={(value) => setFilter({ ...filter, category: value })}>
            <SelectTrigger className="w-full h-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 md:rounded-s-full">
              <SelectValue placeholder="Property type" className="truncate" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.data && allCategories.data.length > 0 ? (
                allCategories.data.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
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
          className="size-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 max-sm:col-span-2"
        />

        <Input
          type="number"
          min={0}
          value={filter.beds ?? ""}
          onChange={(event) => setFilter({ ...filter, beds: event.target.value ? Number(event.target.value) : null })}
          placeholder="Bedrooms"
          className="size-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 max-sm:col-span-2"
        />

        <Input
          type="number"
          min={0}
          value={filter.baths ?? ""}
          onChange={(event) => setFilter({ ...filter, baths: event.target.value ? Number(event.target.value) : null })}
          placeholder="Bathrooms"
          className="size-full border border-slate-200 bg-slate-50 text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-300 max-sm:col-span-2"
        />

        <Button type="submit" variant="secondary" size="sm" className="h-full flex-1 rounded-full  flex items-center justify-center p-0 max-sm:col-span-6 md:bg-accent-bright/80 md:hover:bg-accent-bright">
          <Search size={18} /> Search
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;
