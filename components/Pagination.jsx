"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Pagination({ count, ITEMS_PER_PAGE }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);
  const page = params.get("page") || 1;

  const hasPrev = parseInt(page) > 1;

  const hasNext = parseInt(page) < Math.ceil(count / ITEMS_PER_PAGE);
  return (
    <div className="flex justify-between p-[10px]">
      <button
        disabled={!hasPrev}
        className=" pagination_btn disabled:bg-gray-500"
        onClick={() => {
          params.set("page", parseInt(page) - 1);
          replace(`${pathname}?${params}`);
        }}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className="pagination_btn disabled:bg-gray-500"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("page", parseInt(page) + 1);
          replace(`${pathname}?${params}`);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
