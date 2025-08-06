import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { recordSale } from '../../api/product';
import type { ProductSaleDetail } from '../../types/product.dto';

export default function ProductSaleView() {
    const { saleId } = useParams<{ saleId: string }>();
    const pageUrl = window.location.href;

    const { data, isLoading } = useQuery<ProductSaleDetail>({
        queryKey: ['sale', saleId],
        queryFn: () => recordSale(saleId!),
        enabled: !!saleId,
    });

    if (isLoading || !data) return <p className="text-center py-10">Loading...</p>;

    return (
        // <div className="text-gray-700 max-w-4xl p-6">
        //     <h1 className="text-2xl font-semibold mb-6 text-blue-700">Product Sale Details</h1>

        //     <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow">
        //         <div>
        //             <h2 className="text-lg font-medium mb-2">Product Info</h2>
        //             <p className="flex justify-between gap-4">
        //                 <span className="font-medium">Name:</span>
        //                 <span>{data.product.name}</span>
        //             </p>
        //             <p className="flex justify-between gap-4">
        //                 <span className="font-medium">Brand:</span>
        //                 <span>{data.product.brand.name}</span>
        //             </p>
        //             <p className="flex justify-between gap-4">
        //                 <span className="font-medium">Description:</span>
        //                 <span>{data.product.description}</span>
        //             </p>
        //             <p className="flex justify-between gap-4">
        //                 <span className="font-medium">Volume:</span>
        //                 <span>{data.product.volume_ml} ml</span>
        //             </p>
        //         </div>


        //         <div>
        //             <h2 className="text-lg font-medium text-gray-700">Sale Info</h2>
        //             <p><strong>Quantity:</strong> {data.quantity}</p>
        //             <p><strong>Cost Price:</strong> ₦{data.costPrice}</p>
        //             <p><strong>Sold At:</strong> {new Date(data.saleDate).toLocaleString()}</p>
        //         </div>

        //         <div>
        //             <h2 className="text-lg font-medium text-gray-700">Store Info</h2>
        //             <p><strong>Name:</strong> {data.store.name}</p>
        //             <p><strong>Phone:</strong> {data.store.phone}</p>
        //             <p><strong>Email:</strong> {data.store.email}</p>
        //         </div>

        //         {data.predecessorStore && (
        //             <div>
        //                 <h2 className="text-lg font-medium text-gray-700">Previous Store</h2>
        //                 <p><strong>Name:</strong> {data.predecessorStore.name}</p>
        //                 <p><strong>Phone:</strong> {data.predecessorStore.phone}</p>
        //             </div>
        //         )}

        //         <div className="col-span-2 mt-6">
        //             <h2 className="text-lg font-medium text-gray-700 mb-2">Product History</h2>
        //             {data.product.histories.map((history) => (
        //                 <div key={history.id} className="border border-gray-300 p-3 mb-2 rounded">
        //                     <p><strong>{history.title}</strong></p>
        //                     <p>{history.description}</p>
        //                     <p className="text-sm text-gray-500">Updated: {new Date(history.updatedAt).toLocaleString()}</p>
        //                 </div>
        //             ))}
        //         </div>

        //         <div className="col-span-2 flex flex-col items-center mt-6">
        //             <h2 className="text-lg font-medium text-gray-700 mb-2">QR Code (Link to this page)</h2>
        //             <QRCodeSVG value={pageUrl} size={150} />
        //         </div>
        //     </div>
        // </div>
        <div className="grid grid-cols-2 gap-4 mx-32 px-8 bg-white p-6 rounded-lg shadow text-sm text-gray-800">
            {/* Product Info */}
            <div>
                <h2 className="text-lg font-medium mb-3 text-gray-700">Product Info</h2>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Name:</span>
                    <span>{data.product.name}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Brand:</span>
                    <span>{data.product.brand.name}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Description:</span>
                    <span>{data.product.description}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Volume:</span>
                    <span>{data.product.volume_ml} ml</span>
                </p>
            </div>

            {/* Sale Info */}
            <div>
                <h2 className="text-lg font-medium mb-3 text-gray-700">Sale Info</h2>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Quantity:</span>
                    <span>{data.quantity}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Cost Price:</span>
                    <span>₦{data.costPrice}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Sold At:</span>
                    <span>{new Date(data.saleDate).toLocaleString()}</span>
                </p>
            </div>

            {/* Store Info */}
            <div>
                <h2 className="text-lg font-medium mb-3 text-gray-700">Store Info</h2>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Name:</span>
                    <span>{data.store.name}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Phone:</span>
                    <span>{data.store.phone}</span>
                </p>
                <p className="flex justify-between gap-4">
                    <span className="font-medium">Email:</span>
                    <span>{data.store.email}</span>
                </p>
            </div>

            {/* Previous Store Info (optional) */}
            {data.predecessorStore && (
                <div>
                    <h2 className="text-lg font-medium mb-3 text-gray-700">Previous Store</h2>
                    <p className="flex justify-between gap-4">
                        <span className="font-medium">Name:</span>
                        <span>{data.predecessorStore.name}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                        <span className="font-medium">Phone:</span>
                        <span>{data.predecessorStore.phone}</span>
                    </p>
                </div>
            )}

            {/* Product History */}
            <div className="col-span-2 mt-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2">Product History</h2>
                {data.product.histories.map((history) => (
                    <div key={history.id} className="border border-gray-300 p-3 mb-2 rounded">
                        <p className="font-medium">{history.title}</p>
                        <p>{history.description}</p>
                        <p className="text-sm text-gray-500">
                            Updated: {new Date(history.updatedAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* QR Code */}
            <div className="col-span-2 mt-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2">QR Code (Link to this page)</h2>
                <div className="flex justify-start">
                    <QRCodeSVG value={pageUrl} size={150} />
                </div>
            </div>
        </div>
    );
}
