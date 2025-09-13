// src/layout/MainLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';


export default function MainLayout() {
  const { pathname } = useLocation();

  // Hide navbar on product detail page
  // const hideNavbar = pathname.startsWith('/products/') && pathname !== '/products/new';

  return (
    <div className="min-h-screen min-w-screen px-16 flex flex-col bg-gray-50">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
