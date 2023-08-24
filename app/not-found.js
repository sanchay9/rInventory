import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
              That’s a 404
            </p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
              Page not found
            </h1>
            <p className="mb-12 max-w-screen-md text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>
            <Link
              className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
              href="/"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
