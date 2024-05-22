"use client";

import { SearchBar } from "@/app/components/search-bar";
import React, { Dispatch, SetStateAction } from "react";
import { Categories } from "./categories";

export function FilterSection() {
  const [query, setQuery] = React.useState<string>("");

  return (
    <div className="w-full mb-16">
      <div className="w-2/3">
        {/* <SearchBar query={query} setQuery={setQuery} /> */}
      </div>

      <Categories />
    </div>
  );
}
