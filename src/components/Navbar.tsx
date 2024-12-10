"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useState } from "react";

export default function Navbar({onSearch,}: {onSearch: (query: string) => void;})
 {
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (

    <nav className="p-1 text-black shadow-lg block w-full max-w-screen-lg px-4 py-1 mx-auto sticky top-3  lg:px-8 lg:py-1.5 backdrop-blur-lg backdrop-saturate-150 z-[9999] rounded-3xl bg-opacity-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/product-display"
          className="text-2xl font-bold tracking-wider hover:text-gray-300"
        >
          <span className="text-black">ProductStore</span>
        </Link>

        <div className="relative hidden md:block">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="p-1.5 pl-8 border border-violet-500 rounded-3xl backdrop-blur-lg shadow-sm text-violet-900 bg-transparent focus:outline-none focus:ring-1 focus:ring-violet-800 w-64 sm:w-80 md:w-96"
          />

          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <div>
          <Link
            href="/cart"
            className="text-lg font-semibold hover:text-gray-300 flex items-center space-x-2"
          >
            <svg
              className="h-8 w-8 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{totalItems}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
