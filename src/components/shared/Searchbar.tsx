"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { use, useState } from "react";
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
    category: "",
    price: null,
    baths: null,
    beds: null
  });


  // get the categories for searching
  const allCategories = use(getCategories);

  const category = param.get('category')
  const baths = param.get('baths')
  const beds = param.get('beds')
  const price = param.get('price')

  return (
    <section className="w-full max-w-4xl flex justify-between gap-2 p-1.5 md:p-2 bg-light-50 rounded-xl md:rounded-full border border-border mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap- my-auto divide-dark-50">
        <Select value={filter.category} onValueChange={e => setFilter({ ...filter, category: e })} defaultValue={category?.toString()}>
          <SelectTrigger className="w-full border-none  focus-visible:ring-0 focus-visible:ring-offset-0">
            <SelectValue placeholder="Property type" className="truncate" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.data && allCategories.data.length > 0 ? (
              allCategories.data.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))
            ) : (
              <p className="text-xs md:text-sm text-light-100 text-center">No categories</p>
            )}
          </SelectContent>
        </Select>

        <Input type="number" min={0} defaultValue={price?.toString()} onChange={e => setFilter({ ...filter, price: parseInt(e.target.value) || null })} placeholder="Min. Price" className="w-full text-base text-dark-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0" />

        <Input type="number" min={0} defaultValue={beds?.toString()} onChange={e => setFilter({ ...filter, beds: parseInt(e.target.value) })} placeholder="No. of beds" className="w-full text-base text-dark-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0" />


        <Input type="number" min={0} defaultValue={baths?.toString()} onChange={e => setFilter({ ...filter, baths: parseInt(e.target.value) })} placeholder="No. of baths" className="w-full not-visited:text-base text-dark-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0" />
      </div>

      <Button type="button" size="sm" onClick={() => handleSearch(filter, url)} className="size-10 bg-accent-bright hover:bg-accent-brown cursor-pointer text-dark-200 rounded-full">

        <Search className="size-7" />
      </Button>
    </section>
  );
};

export default Searchbar;
