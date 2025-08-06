import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBrand } from '../../api/brand';

const schema = z.object({
  name: z.string().min(2, 'Brand name is required'),
  description: z.string().min(10, 'Description is required'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  logoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof schema>;

export default function BrandForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success('Brand created successfully');
      reset();
    },
    onError: () => toast.error('Failed to create brand'),
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto bg-white p-6 shadow rounded-lg mt-6 border border-blue-200"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-800">Create a Brand</h2>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {/* Brand Name */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-700">
            Brand Name
          </label>
          <input
            id="name"
            {...register('name')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Star Lager"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-blue-700">
            Website URL
          </label>
          <input
            id="website"
            {...register('website')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="https://starbeer.com"
          />
          {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
        </div>

        {/* Logo URL */}
        <div className="md:col-span-2">
          <label htmlFor="logoUrl" className="block mb-2 text-sm font-medium text-blue-700">
            Logo URL
          </label>
          <input
            id="logoUrl"
            {...register('logoUrl')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="https://cdn.myapp.com/logos/star.png"
          />
          {errors.logoUrl && <p className="text-sm text-red-500">{errors.logoUrl.message}</p>}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-blue-700">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            {...register('description')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            placeholder="Founded in 1949, one of Nigeria's oldest beer brands."
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="confirm"
          className="w-4 h-4 mr-2 text-blue-600 focus:ring-blue-500"
          required
        />
        <label htmlFor="confirm" className="text-sm text-gray-700">
          I confirm the above brand details are accurate.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-5 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-500"
      >
        {isSubmitting ? 'Submitting...' : 'Create Brand'}
      </button>
    </form>
  );
}
