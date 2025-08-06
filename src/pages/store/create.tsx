import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { createStoreSchema, CreateStoreFormData } from '../../schemas/store.schema';
import { useMutation } from '@tanstack/react-query';
import { createStore } from '../../api/store';
import toast from 'react-hot-toast';


import { z } from 'zod';

export const createStoreSchema = z.object({
    name: z.string().min(1, 'Store name is required'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional(),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;

export default function StoreForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateStoreFormData>({
        resolver: zodResolver(createStoreSchema),
    });

    const mutation = useMutation({
        mutationFn: createStore,
        onSuccess: () => {
            toast.success('Store created successfully');
            reset();
        },
        onError: () => {
            toast.error('Failed to create store');
        },
    });

    const onSubmit = (data: CreateStoreFormData) => mutation.mutate(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">Create Store</h2>
            <div className='grid grid-cols-2 gap-8'>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-700 text-left">
                        Store Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
                        placeholder="Shoprite Ikeja"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-blue-700 text-left">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        {...register('address')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
                        placeholder="Ikeja City Mall, Lagos"
                    />
                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-blue-700 text-left">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        {...register('phone')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
                        placeholder="+2348012345678"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-700 text-left">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
                        placeholder="manager@shoprite.com"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

            </div>
        <div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
                {isSubmitting ? 'Submitting...' : 'Create Store'}
            </button>
        </div>
        </form>
    );
}
