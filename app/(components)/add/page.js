"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function AddPage() {
  const [productForm, setProductForm] = useState({});

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productForm?.slug || !productForm?.price || !productForm?.quantity) {
      toast.error("Please fill out all fields");
      return;
    } else if (productForm?.price < 0 || productForm?.quantity < 0) {
      toast.error("Price and quantity must be greater than 0");
      return;
    }

    try {
      toast.promise(
        fetch("/api/product", {
          method: "POST",
          body: JSON.stringify(productForm),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: "Adding a New Product...",
          success: (res) => {
            if (!res.ok) {
              throw new Error(`Status code: ${res.status}`);
            }
            return <b>Product added successfully</b>;
          },
          error: (e) => {
            return `Uh oh, there was an error! ${e.message}`;
          },
        }
      );

      setProductForm({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
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
              Add a Product
            </h1>
            <form>
              <div className="mb-4">
                <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
                  Product Name
                </label>
                <input
                  onChange={handleChange}
                  name="slug"
                  value={productForm?.slug || ""}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                  type="text"
                  placeholder="Product Name"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
                  Product Price
                </label>
                <input
                  onChange={handleChange}
                  name="price"
                  value={productForm?.price || ""}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                  type="number"
                  placeholder="Product Price"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
                  Product Quantity
                </label>
                <input
                  onChange={handleChange}
                  name="quantity"
                  value={productForm?.quantity || ""}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                  type="number"
                  placeholder="Product Quantity"
                />
              </div>
              <div className="mb-4">
                <button
                  onClick={addProduct}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-gray-100 p-4 rounded-lg font-bold tracking-wide uppercase"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
