import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";
import { recordSale } from "../../api/product";
import type { ProductView } from "../../types/product.dto";

export default function ProductSaleView() {
  const { productId } = useParams<{ productId: string }>();
  const pageUrl = window.location.href;

  const { data, isLoading } = useQuery<ProductView>({
    queryKey: ["sale", productId],
    queryFn: () => recordSale(productId!),
    enabled: !!productId,
  });

  if (isLoading || !data)
    return <p className="text-center py-10">Loading...</p>;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-800">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-6">
        {/* Product Image */}
        <div className="flex justify-start">
          {data && (
            <img
              src={""}
              alt={data.qrcode_url}
              className="w-24 h-24 object-cover rounded-lg shadow"
            />
          )}
        </div>

        {/* Product Name */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {data.name}
          </h1>
        </div>

        {/* QR Code */}
        <div className="flex justify-end">
          <QRCodeSVG value={pageUrl} size={120} />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Info */}
        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <p>
            <span className="font-semibold">Name:</span> {data.name}
          </p>
          <p>
            <span className="font-semibold">Brand:</span> {data.brand.name}
          </p>
          {data.brand.website && (
            <a
              href={data.brand.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 text-sm underline"
            >
              Visit Brand Website
            </a>
          )}
          <p className="mt-2">
            <span className="font-semibold">Volume:</span> {data.volume_ml}ml
          </p>
          <p>
            <span className="font-semibold">Production Date:</span>{" "}
            {formatDate(data.production_date)}
          </p>
          <p>
            <span className="font-semibold">Expiry Date:</span>{" "}
            {formatDate(data.expiration_date)}
          </p>

          {/* Expandable Description */}
          {data.description && (
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600">
                Read Description
              </summary>
              <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                {data.description}
              </p>
            </details>
          )}
        </div>

        {/* Sale & Store Info */}
        <div className="p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Sales & Store Details</h2>

          {data.sales.length === 0 ? (
            <p className="text-gray-500">No sales recorded.</p>
          ) : (
            data.sales.map((sale) => (
              <div
                key={sale.id}
                className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <p>
                  <span className="font-semibold">Sale Date:</span>{" "}
                  {new Date(sale.saleDate).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {sale.quantity}
                </p>
                <p>
                  <span className="font-semibold">Cost Price:</span> ₦
                  {sale.costPrice.toLocaleString()}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Store Info</h3>
                  <p>{sale.store.name}</p>
                  <p className="text-sm">{sale.store.address}</p>
                  <p className="text-sm">📞 {sale.store.phone}</p>
                  <p className="text-sm">✉️ {sale.store.email}</p>
                </div>

                {sale.predecessorStore && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">
                      Previous Store
                    </h3>
                    <p>{sale.predecessorStore.name}</p>
                    <p className="text-sm">📞 {sale.predecessorStore.phone}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Product History */}
      {data.histories?.length > 0 && (
        <div className="mt-6 p-6 bg-white shadow rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Product History</h2>
          {data.histories.map((history) => (
            <div
              key={history.id}
              className="border border-gray-300 p-3 mb-2 rounded"
            >
              <p className="font-medium">{history.title}</p>
              <p>{history.description}</p>
              <p className="text-sm text-gray-500">
                Updated: {new Date(history.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
