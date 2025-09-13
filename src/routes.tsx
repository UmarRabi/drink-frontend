// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts';
import BrandForm from './pages/brand/create';
import ProductForm from './pages/product/create';
import StoreForm from './pages/store/create';
import ProductHistoryForm from './pages/product/history';
import ProductTable from './pages/product';
import ProductSaleForm from './pages/product/sale';
import ProductSaleView from './pages/product/saleView';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <ProductTable /> },
            { path: '/products', element: <ProductTable /> },
            { path: '/store/new', element: <StoreForm /> },
            { path: '/products/new', element: <ProductForm /> },
            { path: '/products/:productId/history', element: <ProductHistoryForm /> },
            { path: '/products/:productId/sales', element: <ProductSaleForm /> },
            { path: '/products/:productId', element: <ProductSaleView /> },
            { path: '/brands/new', element: <BrandForm /> },
            // additional routes can go here
        ],
    },
]);
