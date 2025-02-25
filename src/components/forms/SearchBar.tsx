"use client";

import React from "react";
import { MdSearch } from "react-icons/md";

function SearchBar() {
  return (
    <form
      action={() => console.log("check")}
      className="flex items-center relative w-full"
    >
      <input
        type="search"
        placeholder="Search..."
        name="q"
        className="w-full placeholder:text-gray-300 text-sm lg:text-base font-thin text-blue-300 pr-8 outline-none border rounded-full"
      />
      <MdSearch
        size={24}
        className="text-blue-200 group-hover:text-blue-300 transition-all absolute right-2 cursor-pointer"
      />
    </form>
  );
}

export default SearchBar;
