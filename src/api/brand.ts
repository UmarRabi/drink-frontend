// import { api } from './axios';
// import { Brand, BrandSummary, CreateBrandDto } from '../types';

import { api } from ".";
import type { Brand, BrandSummary, CreateBrandDto } from "../types/brand.dto";

export const createBrand = async (data: CreateBrandDto): Promise<Brand> => {
  const res = await api.post('/brands', data);
  return res.data;
};

export const getAllBrands = async (): Promise<BrandSummary[]> => {
  const res = await api.get('/brands');
  return res.data;
};
