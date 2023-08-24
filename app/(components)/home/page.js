import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.webp";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center pt-10 flex-wrap">
        <div className="flex flex-col">
          <div className="sm:py-8 lg:py-24">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <div>
                <h2 className="text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                  Welcome to rInventory!
                </h2>
                <div className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
                  <p>
                    This is a simple inventory management app that allows you to
                    add, edit, and delete stocks.<br></br>
                    This app is built with Next.js, ReactJS, MongoDB, and
                    Tailwind CSS.
                  </p>
                  <div className="pt-16">
                    <strong>Instructions:</strong> Click on the links below to
                    navigate to the different pages.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col space-y-4">
              <Link
                className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-6 rounded-md shadow-md transition duration-300"
                href="/display"
              >
                List All Stocks
              </Link>

              <Link
                className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-6 rounded-md shadow-md transition duration-300"
                href="/add"
              >
                Add a New Stock
              </Link>

              <Link
                className="bg-gray-800 hover:bg-gray-600 text-white py-3 px-6 rounded-md shadow-md transition duration-300"
                href="/search"
              >
                Search for a Stock
              </Link>
            </div>
          </div>
        </div>
        <div className="p-24">
          <Image
            src={logo}
            alt="Stocks"
            width={400}
            height={400}
            className="mt-16 rounded-md transition duration-300 hover:shadow-2xl hover:scale-110"
          />
        </div>
      </div>
    </>
  );
}
