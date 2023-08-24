"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderLinks() {
  const pathname = usePathname();

  return (
    <>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link
          className={`mr-4 inline-flex items-center py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 ${
            pathname === "/add" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
          href="/add"
        >
          {" "}
          Add
        </Link>
        <Link
          className={`mr-4 inline-flex items-center py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 ${
            pathname === "/display"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
          href="/display"
        >
          {" "}
          Display
        </Link>
        <Link
          className={`mr-4 inline-flex items-center py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 ${
            pathname === "/search"
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
          href="/search"
        >
          Search
        </Link>
      </nav>
    </>
  );
}
