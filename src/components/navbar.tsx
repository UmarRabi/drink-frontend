// src/components/Navbar.tsx
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // You can replace this with your logo

export default function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-600 font-medium underline'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-16" />
        <span className="text-lg font-semibold text-gray-800">Bottled Drinks</span>
      </Link>

      <div className="flex gap-6 text-sm">
        <NavLink to="/products" className={navLinkClass}>
          Products
        </NavLink>
        <NavLink to="/products/new" className={navLinkClass}>
          Add Product
        </NavLink>
        <NavLink to="/store/new" className={navLinkClass}>
          Add Store
        </NavLink>
        <NavLink to="/brands/new" className={navLinkClass}>
          Add Brand
        </NavLink>
      </div>
    </nav>
  );
}
