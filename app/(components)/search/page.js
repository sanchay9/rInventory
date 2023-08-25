"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function SearchPage() {
  const [dropdown, setDropdown] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    handleDropdownChange();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDropdownChange();
  };

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const handleDropdownChange = async () => {
    if (query === "") {
      setDropdown([]);
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      setDropdown([]);

      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();

      setDropdown(data.products);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const buttonAction = async (action, slug, currentQuantity) => {
    let index = products.findIndex((product) => product.slug === slug);
    let newQuantity =
      action == "plus"
        ? parseInt(currentQuantity) + 1
        : parseInt(currentQuantity) - 1;

    index = dropdown.findIndex((product) => product.slug === slug);
    let newSearch = [...dropdown];
    newSearch[index].quantity = newQuantity;
    setDropdown(newSearch);

    setLoading(true);

    try {
      const res = await fetch("/api/product", {
        method: "PUT",
        body: JSON.stringify({
          action,
          slug,
          currentQuantity,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
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
              Search a Product
            </h1>
            <form className="flex items-center" onSubmit={handleSubmit}>
              <div className="flex-grow relative">
                <input
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
                {loading && <div className="text-center pt-4">Loading...</div>}
                {dropdown.length > 0 && (
                  <div className="bg-gray-100 absolute w-full mt-1 rounded-lg">
                    {dropdown.map((product) => {
                      return (
                        <div
                          className="p-2 justify-between flex items-center rounded-lg hover:bg-gray-300"
                          key={product._id}
                        >
                          <div>{product.slug}</div>
                          <div>
                            {product.quantity} {"available for Rs. "}
                            {product.price} {"each"}
                          </div>
                          <div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  buttonAction(
                                    "minus",
                                    product.slug,
                                    product.quantity
                                  );
                                }}
                                disabled={loading || product.quantity <= 0}
                                className="bg-red-600 text-white px-2 my-1 rounded-full hover:bg-red-800 disabled:opacity-50"
                              >
                                -
                              </button>
                              <button
                                onClick={() => {
                                  buttonAction(
                                    "plus",
                                    product.slug,
                                    product.quantity
                                  );
                                }}
                                disabled={loading}
                                className="bg-green-600 text-white px-1.5 my-1 rounded-full hover:bg-green-800 disabled:opacity-50"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
