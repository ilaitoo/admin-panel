"use client";
import React from "react";
import SearchIcon from "./icons/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Search({ placeholder }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  function handleSearch(ev) {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (ev.target.value) {
      ev.target.value.length >= 1 && params.set("query", ev.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  }
  return (
    <div className="flex items-center gap-[10px] bg-[#2e374a] p-[10px] rounded-[10px] w-max">
      <SearchIcon className={"size-5 "} />
      <input
        type="text"
        className="bg-transparent border-none text-[--text] outline-none"
        placeholder={placeholder}
        onChange={useDebouncedCallback(handleSearch, 300)}
      />
    </div>
  );
}

export default Search;
