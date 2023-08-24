"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Loading from "@/app/loading";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  const onGithubLogin = async (e) => {
    e.preventDefault();

    await signIn("github", {
      callbackUrl: "/home",
    });
  };

  const onContinueWithoutLogin = async (e) => {
    e.preventDefault();
    console.log("continue without login");

    await signIn("credentials", {
      username: "admin",
      password: "passadmin",
      callbackUrl: "/home",
    });
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="pt-20">
          <div className="py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
                <div className="flex items-center justify-center p-8">
                  You are logged in as{" "}
                  <strong className="pl-2">{session?.user?.name}</strong>
                </div>
                <div className="flex items-center justify-center p-8 text-2xl">
                  Confirm Sign Out?
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => signOut()}
                    className="mr-5 gap-2 rounded-lg border border-gray-300 bg-gray-100 px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:bg-gray-200 md:text-base"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => (window.location.href = "/home")}
                    className="gap-2 rounded-lg border border-gray-300 bg-gray-100 px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:bg-gray-200 md:text-base"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-20">
        <div className="py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
              Login
            </h2>
            <form className="mx-auto max-w-lg rounded-lg border">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <button
                  onClick={onGithubLogin}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                  </svg>
                  Login with Github
                </button>

                <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-gray-300" />
                  <span className="relative bg-white px-4 text-sm text-gray-400">
                    or
                  </span>
                </div>

                <button
                  onClick={onContinueWithoutLogin}
                  className="block rounded-lg bg-gray-800 px-8 py-4 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
                >
                  Continue Without Login
                </button>
              </div>
              <div className="flex items-center justify-center bg-gray-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Powered by
                  <a
                    href="https://next-auth.js.org/"
                    className="text-indigo-500 pl-1 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    NextAuth.js
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
