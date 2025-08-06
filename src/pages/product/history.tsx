import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addProductHistory } from '../../api/product';

const schema = z.object({
  product_id: z.string().uuid({ message: 'Invalid product ID' }),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description is too short'),
  updated_by: z.string().email('Must be a valid email').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export default function ProductHistoryForm() {
  const { productId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_id: productId ?? '',
      title: '',
      description: '',
      updated_by: '',
    },
  });

  const mutation = useMutation({
     mutationFn: (data: FormData) => addProductHistory(productId!, data),
    onSuccess: () => {
      toast.success('Product history added');
      reset({ product_id: productId ?? '', title: '', description: '', updated_by: '' });
    },
    onError: () => {
      toast.error('Failed to add product history');
    },
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  if (!productId) {
    return <p className="text-red-500 text-center mt-10">Invalid or missing product ID in URL.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6 mt-10"
    >
      <h2 className="text-2xl font-bold text-blue-700">Add Product History</h2>

      <input type="hidden" value={productId} {...register('product_id')} />

      <div>
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-blue-700 text-left">
          Title
        </label>
        <input
          id="title"
          {...register('title')}
          className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
          placeholder="e.g. Packaging Update"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-blue-700 text-left">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
          placeholder="Detailed background, update reason, etc."
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="updated_by" className="block mb-2 text-sm font-medium text-blue-700 text-left">
          Updated By (optional)
        </label>
        <input
          id="updated_by"
          type="email"
          {...register('updated_by')}
          className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
          placeholder="e.g. admin@brand.com"
        />
        {errors.updated_by && <p className="text-sm text-red-500">{errors.updated_by.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
      >
        {isSubmitting ? 'Submitting...' : 'Add History'}
      </button>
    </form>
  );
}
