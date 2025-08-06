import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { recordProductSale } from '../../api/product';
import { getAllStores } from '../../api/store';
import type { Store } from '../../types/product.dto';
// import { createProductSale, getStores } from '../../api/sale';
// import { Store } from '../../types/store';

const schema = z.object({
  store_id: z.string().min(1, 'Store is required'),
  predecessor_store_id: z.string().optional(),
  quantity: z.number().min(1, 'Quantity is required'),
  cost_price: z.number().min(0.01, 'Cost price is required'),
});

type FormData = z.infer<typeof schema>;

export default function ProductSaleForm() {
  const { productId } = useParams<{ productId: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { data: stores = [] } = useQuery<Store[]>({
    queryKey: ['stores'],
    queryFn: getAllStores,
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => recordProductSale(productId as string, {
        storeId: data.store_id,
        predecessorStoreId: data.predecessor_store_id || undefined,
        quantity: data.quantity,
        costPrice: data.cost_price,
      }),
    onSuccess: () => {
      toast.success('Product sale recorded');
      reset();
    },
    onError: () => toast.error('Failed to record sale'),
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white p-6 shadow rounded-lg mt-10"
    >
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Record Product Sale</h2>

      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="store_id" className="block mb-2 text-sm font-medium text-blue-700">
            Store
          </label>
          <select
            id="store_id"
            {...register('store_id')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
          >
            <option value="">Select a store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
          {errors.store_id && <p className="text-sm text-red-500">{errors.store_id.message}</p>}
        </div>

        <div>
          <label htmlFor="predecessor_store_id" className="block mb-2 text-sm font-medium text-blue-700">
            Predecessor Store (Optional)
          </label>
          <select
            id="predecessor_store_id"
            {...register('predecessor_store_id')}
            className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
          >
            <option value="">None</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-blue-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            {...register('quantity', { valueAsNumber: true })}
            className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
            placeholder="e.g. 100"
          />
          {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
        </div>

        <div>
          <label htmlFor="cost_price" className="block mb-2 text-sm font-medium text-blue-700">
            Cost Price
          </label>
          <input
            id="cost_price"
            type="number"
            step="0.01"
            {...register('cost_price', { valueAsNumber: true })}
            className="block w-full p-2.5 border border-blue-300 rounded-lg text-gray-900"
            placeholder="e.g. 1200.50"
          />
          {errors.cost_price && <p className="text-sm text-red-500">{errors.cost_price.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg px-5 py-2.5"
      >
        {isSubmitting ? 'Submitting...' : 'Record Sale'}
      </button>
    </form>
  );
}
