import "./globals.css";

import { Inter } from "next/font/google";

import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import AuthProvider from "@/app/context/AuthProvider";
import { ProductProvider } from "@/app/context/ProductProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory App",
  description:
    "An application to manage stock of products built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProductProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children} </main>
              <Footer />
            </div>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
