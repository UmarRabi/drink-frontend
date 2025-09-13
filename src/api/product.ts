import { api } from ".";
import type { 
    CreateProductDto, 
    Product, 
    CreateProductHistoryDto,
    ProductHistory, 
    CreateProductSaleDto, 
    ProductSale, 
    ProductView
} from "../types/product.dto";


export const createProduct = async (data: CreateProductDto): Promise<Product> => {
  const res = await api.post('/products', data);
  return res.data;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await api.get('/products');
  return res.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const addProductHistory = async (
  productId: string,
  data: CreateProductHistoryDto
): Promise<ProductHistory> => {
  const res = await api.post(`/products/${productId}/history`, data);
  return res.data;
};

export const recordProductSale = async (
  productId: string,
  data: CreateProductSaleDto
): Promise<ProductSale> => {
  const res = await api.post(`/products/${productId}/sales`, data);
  return res.data;
};
export const recordSale = async (
  saleId: string,
): Promise<ProductView> => {
  const res = await api.get(`/products/sale/${saleId}`);
  return res.data;
};
