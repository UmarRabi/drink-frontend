import { api } from ".";
import type { CreateStoreDto, Store } from "../types/product.dto";


export const createStore = async (data: CreateStoreDto): Promise<Store> => {
  const res = await api.post('/stores', data);
  return res.data;
};

export const getAllStores = async (): Promise<Store[]> => {
  const res = await api.get('/stores');
  return res.data;
};
