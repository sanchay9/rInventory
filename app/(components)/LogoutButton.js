"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
        <svg
          className="animate-spin rounded-full border-t-4 bg-gray-500 h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Loading...
      </p>
    );
  }

  if (status === "unauthenticated") {
    return "";
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div>Signed in as</div>
        <div className="ml-1.5 font-bold">{session?.user?.name}</div>
        {session?.user?.image && (
          <Image
            width={24}
            height={24}
            className="rounded-full ml-1"
            src={session?.user?.image}
            alt={session?.user?.name ?? "Profile Pic"}
          />
        )}
        <Link
          href="/api/auth/signout"
          className="ml-6 inline-flex items-center bg-gray-100 border border-gray-500 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          Sign Out
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            className="w-4 h-4 ml-2"
          >
            <path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"></path>
          </svg>
        </Link>
      </div>
    </>
  );
}
