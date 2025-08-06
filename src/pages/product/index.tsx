import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/product';
import type { Product } from '../../types/product.dto';
import { useState } from 'react';


export default function ProductTable() {
    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (id: string) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    };

    if (isLoading) return <p className="text-center py-10">Loading products...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Products</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Description</th>
                            <th scope="col" className="px-4 py-3">Brand</th>
                            <th scope="col" className="px-4 py-3">Volume</th>
                            <th scope="col" className="px-4 py-3">Production Date</th>
                            <th scope="col" className="px-4 py-3">Expiration Date</th>
                            <th scope="col" className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id} className="bg-white border-b hover:bg-blue-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                                <td className="px-4 py-3">{product.description}</td>
                                <td className="px-4 py-3">{product.brand?.name}</td>
                                <td className="px-4 py-3">{product?.volumeMl}</td>
                                <td className="px-4 py-3">{product?.production_date}</td>
                                <td className="px-4 py-3">{product?.expiration_date}</td>
                                <td className="px-4 py-3 text-center">
                                    <div className="relative bg-white text-left">
                                        <button
                                            onClick={() => toggleDropdown(product.id)}
                                            className="justify-center w-full px-3 py-1 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none"
                                        >
                                            Actions ▾
                                        </button>


                                        {openDropdown === product.id && (
                                            <div className="absolute right-0 z-10 mt-2 w-44 top-[-10px] rounded-md bg-white border border-gray-200 shadow-lg">
                                                <div className="py-1 text-sm text-gray-700">
                                                    <Link
                                                        to={`/products/${product.id}/history`}
                                                        className="block px-4 py-2 hover:bg-blue-50"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        ➕ Add History
                                                    </Link>
                                                    <Link
                                                        to={`/products/${product.id}/sales`}
                                                        className="block px-4 py-2 hover:bg-blue-50"
                                                        onClick={() => setOpenDropdown(null)}
                                                    >
                                                        ➕ Add Sales
                                                    </Link>
                                                    {/* Future options can go here */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
