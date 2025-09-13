export interface CreateProductDto {
  name: string;
  brandId: string;
  volume_ml: number;
  production_date: string;
  expiration_date: string;
  description: string;
}



export interface Product {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  volumeMl: number;
  production_date: string;
  expiration_date: string;
  description: string;
  createdAt: string;
}


export interface CreateProductHistoryDto {
  title: string;
  description: string;
  updatedBy?: string;
}


export interface CreateProductSaleDto {
  storeId: string;
  predecessorStoreId?: string;
  quantity: number;
  costPrice: number;
}

export interface ProductSale {
  id: string;
  productId: string;
  storeId: string;
  predecessorStoreId?: string;
  quantity: number;
  costPrice: string; // Decimal stored as string
  createdAt: string;
}

export interface ProductHistory {
  id: string;
  productId: string;
  title: string;
  description: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface CreateStoreDto {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  contactEmail?: string;
  createdAt: string;
}

export interface ProductSaleDetail {
  id: string;
  productId: string;
  storeId: string;
  predecessorStoreId?: string | null;
  description?: string | null;
  quantity: number;
  costPrice: number;
  saleDate: string;

  store: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
  };

  predecessorStore?: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
  };

  product: {
    id: string;
    brandId: string;
    name: string;
    description: string;
    volume_ml: number;
    production_date: string;
    expiration_date: string;
    createdAt: string;
    updatedAt: string;

    histories: {
      id: string;
      productId: string;
      title: string;
      description: string;
      updatedBy?: string | null;
      updatedAt: string;
    }[];

    brand: {
      id: string;
      name: string;
      description: string;
      website?: string;
      logoUrl?: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface ProductView {
  id: string;
  brandId: string;
  name: string;
  description: string;
  volume_ml: number;
  qrcode_url: string;
  production_date: string; // ISO string
  expiration_date: string; // ISO string
  createdAt: string;
  updatedAt: string;

  sales: {
    id: string;
    productId: string;
    description: string | null;
    storeId: string;
    predecessorStoreId: string;
    quantity: number;
    costPrice: number;
    saleDate: string; // ISO string
    predecessorStore: {
      id: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    store: {
      id: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];

  histories: {
    id: string;
    productId: string;
    title: string;
    description: string;
    updatedBy: string | null;
    updatedAt: string; // ISO string
  }[];

  brand: {
    id: string;
    name: string;
    description: string;
    website: string;
    logoUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}



