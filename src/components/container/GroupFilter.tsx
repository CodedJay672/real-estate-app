"use client";

import React, { useCallback, useRef, use, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Search } from "lucide-react";

import useSearch from "@/hooks/useSearch";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

interface GroupFilterProps {
  url?: string;
  getCategories?: Promise<ApiResponse<{ id: string; name: string }[]>>;
  callbackFn?: () => void;
}

const GroupFilter: React.FC<GroupFilterProps> = React.memo(({ url, getCategories, callbackFn }) => {
  const params = useSearchParams();
  const { handleSearch, clearFilters } = useSearch();

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const categoryValueRef = useRef<string>(params.get("category") ?? "");
  const priceRef = useRef<HTMLInputElement>(null);
  const bedsRef = useRef<HTMLInputElement>(null);
  const bathsRef = useRef<HTMLInputElement>(null);
  const postedDaysRef = useRef<string>("");

  let defaultPostedDays = "";
  const postedParam = params.get("postedOn");
  if (postedParam) {
    const then = new Date(postedParam);
    const diff = Date.now() - then.getTime();
    if (diff <= 86400000) defaultPostedDays = "1";
    else if (diff <= 604800000) defaultPostedDays = "7";
    else defaultPostedDays = "30";
    postedDaysRef.current = defaultPostedDays;
  }


  const applyFilters = useCallback(() => {
    const filter: TFilterQuery = {};

    const name = nameRef.current?.value;
    if (name) filter.name = name;
    const category = categoryValueRef.current || categoryRef.current?.value;
    if (category) filter.category = category;

    const priceVal = priceRef.current?.value;
    if (priceVal) filter.price = parseFloat(priceVal);

    const bedsVal = bedsRef.current?.value;
    if (bedsVal) filter.beds = parseInt(bedsVal, 10);

    const bathsVal = bathsRef.current?.value;
    if (bathsVal) filter.baths = parseInt(bathsVal, 10);

    const postedVal = postedDaysRef.current;
    if (postedVal) {
      const days = parseInt(postedVal, 10);
      filter.postedOn = new Date(Date.now() - days * 86400000);
    }

    handleSearch(filter, url);
    if (callbackFn) callbackFn();
  }, [handleSearch, url]);

  const categoryField = getCategories ? (
    (() => {
      const allCategories = use(getCategories);
      return (
        <Select
          defaultValue={categoryValueRef.current}
          onValueChange={(v) => {
            categoryValueRef.current = v;
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Property type" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.data && allCategories.data.length > 0 ? (
              allCategories.data.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))
            ) : (
              <p className="text-xs md:text-sm text-light-100 text-center">
                No categories
              </p>
            )}
          </SelectContent>
        </Select>
      );
    })()
  ) : (
    <Input
      ref={categoryRef}
      defaultValue={categoryValueRef.current}
      onChange={(e) => (categoryValueRef.current = e.target.value)}
      placeholder="e.g. Apartment, House"
      className="mt-1"
    />
  );

  return (
    <div className="space-y-4 p-4">
      <div className="w-full bg-transparent focus-within:bg-light-50 flex items-center relative">
        <Input type="search" ref={nameRef} defaultValue={params.get('name') ?? ""} placeholder="Property name" className="w-full p-1 pl-6" />
        <Search size={16} className="text-light-200 absolute left-1" />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        {categoryField}
      </div>

      <div>
        <label className="block text-sm font-medium">Min. Price</label>
        <Input
          ref={priceRef}
          type="number"
          min={0}
          defaultValue={params.get("price") ?? ""}
          placeholder="0"
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Beds</label>
          <Input
            ref={bedsRef}
            type="number"
            min={0}
            defaultValue={params.get("beds") ?? ""}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Baths</label>
          <Input
            ref={bathsRef}
            type="number"
            min={0}
            defaultValue={params.get("baths") ?? ""}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium flex items-center gap-1">
          <Calendar size={16} />
          Posted on
        </label>
        <Select
          defaultValue={defaultPostedDays}
          onValueChange={(v) => (postedDaysRef.current = v)}
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Any time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Last 24 hours</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={applyFilters} className="flex-1">
          Apply filters
        </Button>
        <Button size="sm" variant="outline" onClick={() => {
          clearFilters()
          if (callbackFn) callbackFn();
        }
        } className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
});

GroupFilter.displayName = "GroupFilter";

export default GroupFilter;