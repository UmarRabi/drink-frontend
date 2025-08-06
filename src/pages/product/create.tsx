import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createProduct } from '../../api/product';
import { getAllBrands } from '../../api/brand';

const schema = z.object({
    brandId: z.string().uuid('Must be a valid UUID'),
    name: z.string().min(1, 'Product name is required'),
    description: z.string().min(10, 'Description is required'),
    volume_ml: z.number().int().positive(),
    production_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Must be a valid ISO date',
    }),
    expiration_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Must be a valid ISO date',
    }),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ resolver: zodResolver(schema) });
    const { data: brands = [], isLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: getAllBrands,
    });
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            toast.success('Product created successfully');
            reset();
        },
        onError: () => toast.error('Failed to create product'),
    });

    const onSubmit = (data: FormData) => mutation.mutate(data);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg mt-6 border border-blue-200"
        >
            <h2 className="text-2xl font-semibold mb-6 text-blue-800">Create New Product</h2>

            <div className="grid  gap-6 mb-6 md:grid-cols-3">
                {/* Brand ID */}
                <div>
                    <label
                        htmlFor="brand_id"
                        className="block mb-2 text-sm font-medium text-blue-700 text-left"
                    >
                        Brand
                    </label>
                    <select
                        id="brand_id"
                        {...register('brandId')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
                        defaultValue=""
                    >
                        <option value="" disabled>Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                    {errors.brandId && <p className="text-sm text-red-500">{errors.brandId.message}</p>}
                </div>


                {/* Name */}
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-left text-blue-700">
                        Product Name
                    </label>
                    <input
                        id="name"
                        {...register('name')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Star Lager 500ml"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Volume */}
                <div>
                    <label htmlFor="volume_ml" className="block mb-2 text-left text-sm font-medium text-blue-700">
                        Volume (ml)
                    </label>
                    <input
                        id="volume_ml"
                        type="number"
                        {...register('volume_ml', { valueAsNumber: true })}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="500"
                    />
                    {errors.volume_ml && <p className="text-sm text-red-500">{errors.volume_ml.message}</p>}
                </div>

                {/* Production Date */}
                <div>
                    <label htmlFor="production_date" className="block mb-2 text-left text-sm font-medium text-blue-700">
                        Production Date
                    </label>
                    <input
                        id="production_date"
                        type="date"
                        {...register('production_date')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.production_date && (
                        <p className="text-sm text-red-500">{errors.production_date.message}</p>
                    )}
                </div>

                {/* Expiration Date */}
                <div className="md:col-span-1">
                    <label htmlFor="expiration_date" className="block mb-2 text-left text-sm font-medium text-blue-700">
                        Expiration Date
                    </label>
                    <input
                        id="expiration_date"
                        type="date"
                        {...register('expiration_date')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.expiration_date && (
                        <p className="text-sm text-red-500">{errors.expiration_date.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="md:col-span-3">
                    <label htmlFor="description" className="block mb-2 text-left text-sm font-medium text-blue-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={5}
                        {...register('description')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Classic lager beer with a crisp refreshing taste."
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-500"
            >
                {isSubmitting ? 'Submitting...' : 'Create Product'}
            </button>
        </form>
    );
}
