"use client";

import { useEffect, useState } from "react";
import { useProduct } from "@/app/context/ProductProvider";
import Modal from "@/app/(components)/Modal";
import { Toaster } from "react-hot-toast";

export default function DisplayPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedProduct } = useProduct();

  useEffect(() => {
    fetchProducts();
  }, [setSelectedProduct]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/product");
      const data = await res.json();

      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal fetchProducts={fetchProducts} />
      <Toaster
        toastOptions={{
          style: {
            marginTop: "4rem",
          },
        }}
      />
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-8/12 my-12 bg-white p-5 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <h1 className="text-3xl justify-center text-center font-bold mb-10 text-gray-800">
              Display Current Stock
            </h1>
            <table className="table-auto w-full mt-4">
              <thead>
                <tr className="">
                  <th className="px-4 py-2">Product Name</th>
                  <th className="px-4 py-2">Product Quantity</th>
                  <th className="px-4 py-2">Product Price</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center font-semibold border px-4 py-2"
                    >
                      Loading...
                    </td>
                  </tr>
                )}
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td className="border rounded-l-lg px-4 py-2">
                        <div className="flex">
                          {product.slug}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 100 100"
                            onClick={() => setSelectedProduct(product)}
                            className="pt-1 ml-2 cursor-pointer"
                          >
                            <path d="M77.926,94.924H8.217C6.441,94.924,5,93.484,5,91.706V21.997c0-1.777,1.441-3.217,3.217-3.217h34.854 c1.777,0,3.217,1.441,3.217,3.217s-1.441,3.217-3.217,3.217H11.435v63.275h63.274V56.851c0-1.777,1.441-3.217,3.217-3.217 c1.777,0,3.217,1.441,3.217,3.217v34.855C81.144,93.484,79.703,94.924,77.926,94.924z" />
                            <path d="M94.059,16.034L84.032,6.017c-1.255-1.255-3.292-1.255-4.547,0l-9.062,9.073L35.396,50.116 c-0.29,0.29-0.525,0.633-0.686,1.008l-7.496,17.513c-0.526,1.212-0.247,2.617,0.676,3.539c0.622,0.622,1.437,0.944,2.274,0.944 c0.429,0,0.858-0.086,1.276-0.257l17.513-7.496c0.375-0.161,0.719-0.397,1.008-0.686l35.026-35.026l9.073-9.062 C95.314,19.326,95.314,17.289,94.059,16.034z M36.286,63.79l2.928-6.821l3.893,3.893L36.286,63.79z M46.925,58.621l-5.469-5.469 L73.007,21.6l5.47,5.469L46.925,58.621z M81.511,24.034l-5.469-5.469l5.716-5.716l5.469,5.459L81.511,24.034z" />
                          </svg>
                        </div>
                      </td>
                      <td className="border px-4 py-2">{product.quantity}</td>
                      <td className="border rounded-r-lg px-4 py-2">
                        {product.price}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border px-4 py-2 text-center" colSpan="3">
                      {loading || "No products found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
