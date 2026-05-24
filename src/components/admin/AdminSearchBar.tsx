"use client";

import useSearch from "@/hooks/useSearch";
import { useRef } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";


export default function AdminSearchBar({ placeholder }: { placeholder: string }) {
  const query = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { handleSearch } = useSearch();


  const debounce = (callback: (value: string) => void, delay: number) => {
    return (args: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(args)
      }, delay)
    }
  }

  const debouncedSearch = debounce((value: string) => {
    console.log('Searching for:', value)
    handleSearch({ name: value })
  }, 500)

  const handleChange = (e: string) => {
    debouncedSearch(e)
  }

  return (
    <div className="w-full max-w-sm relative rounded-lg bg-light-100/20 focus-within:bg-light-50 flex-center">
      <Input
        type="text"
        defaultValue={query.get('name')?.toString()}
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent pl-8"
      />
      <Search size={24} className="text-dark-50 absolute left-1.5" />
    </div>
  )
}
