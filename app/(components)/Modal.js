import { useProduct } from "@/app/context/ProductProvider";
import toast from "react-hot-toast";

export default function Modal({ fetchProducts }) {
  const { selectedProduct, setSelectedProduct } = useProduct();

  if (!selectedProduct) return null;

  const handleChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        fetch("/api/update", {
          method: "PUT",
          body: JSON.stringify(selectedProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: "Updating...",
          success: (res) => {
            if (!res.ok) {
              throw new Error(`Status code: ${res.status}`);
            }

            return <b>Product updated successfully</b>;
          },
          error: (e) => {
            return `Uh oh, there was an error! ${e.message}`;
          },
        }
      );

      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        fetch("/api/delete", {
          method: "DELETE",
          body: JSON.stringify(selectedProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          loading: "Deleting...",
          success: (res) => {
            if (!res.ok) {
              throw new Error(`Status code: ${res.status}`);
            }

            return <b>Product deleted successfully</b>;
          },
          error: (e) => {
            return `Uh oh, there was an error! ${e.message}`;
          },
        }
      );

      setSelectedProduct(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:justify-center">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="flex justify-between items-center">
                    <h3
                      className="text-2xl font-bold text-gray-800"
                      id="modal-title"
                    >
                      {selectedProduct.slug.toUpperCase()}
                    </h3>

                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                      }}
                      type="button"
                      className="w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-xl font-medium text-red-500 hover:font-bold focus:outline-none sm:ml-3"
                    >
                      &#10005;
                    </button>
                  </div>
                  <div className="mt-2">
                    <form>
                      <div className="mb-4">
                        <label className="text-gray-800 mb-1 tracking-wide">
                          Set Product Quantity
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                          value={selectedProduct.quantity}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-gray-800 mb-1 tracking-wide">
                          Set Product Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-gray-500 focus:outline-none"
                          value={selectedProduct.price}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-4 flex justify-between">
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded font-medium w-1/2 mr-2"
                        >
                          Update stock
                        </button>
                        <button
                          onClick={handleDelete}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded font-medium w-1/2 ml-2"
                        >
                          Delete stock
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
