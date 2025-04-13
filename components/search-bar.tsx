"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchBarProps = {
  action: (searchValue: string) => void;
};

function SearchBar({ action }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    action(search.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-4 w-full bg-[#B2A0DA] bg-opacity-15 py-3 px-10 rounded-full">
      <input id="search-bar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent outline-none" placeholder="Cari berdasarkan nama.." />
      <button type="submit">
        <FaSearch className="text-[#433878]" />
      </button>
    </form>
  );
}

export { SearchBar };
