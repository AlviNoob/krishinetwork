// components/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-[#223142] text-white p-4 space-y-6">
      <NavLink to="/dashboard/admin/add-product" className="block hover:underline">🛒 Add Product</NavLink>
      <NavLink to="/dashboard/admin/product-list" className="block hover:underline">📁 Product List</NavLink>
      <NavLink to="/dashboard/admin/order-list" className="block hover:underline">🛒 Order List</NavLink>
      <NavLink to="/dashboard/admin/add-expert" className="block hover:underline">📁 Add Expert List</NavLink>
    </div>
  );
};

export default AdminSidebar;
