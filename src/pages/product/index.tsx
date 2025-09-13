import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/product";
import type { Product } from "../../types/product.dto";
import { useState } from "react";
import { FiEye, FiClock, FiShoppingCart } from "react-icons/fi";

export default function ProductTable() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  if (isLoading)
    return <p className="text-center py-10">Loading products...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Products</h2>

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
            >
              {/* Product Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {product.description || "No description available."}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Brand:</span>{" "}
                  {product.brand?.name || "—"}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Volume:</span>{" "}
                  {product.volumeMl}ml
                </p>
                <p className="text-sm">
                  <span className="font-medium">Production:</span>{" "}
                  {product.production_date}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Expiry:</span>{" "}
                  {product.expiration_date}
                </p>
              </div>

              {/* Action Icons */}
              <div className="mt-4 flex justify-end gap-4 text-gray-600">
                {/* View */}
                <Link
                  to={`/products/${product.id}`}
                  className="hover:text-blue-600"
                  title="View Product"
                >
                  <FiEye size={20} />
                </Link>

                {/* History */}
                <Link
                  to={`/products/${product.id}/history`}
                  className="hover:text-green-600"
                  title="Add History"
                >
                  <FiClock size={20} />
                </Link>

                {/* Sales */}
                <Link
                  to={`/products/${product.id}/sales`}
                  className="hover:text-orange-600"
                  title="Add Sale"
                >
                  <FiShoppingCart size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
