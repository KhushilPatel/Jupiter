import Link from 'next/link';
import React from 'react';

const Sider = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100">
      {/* Left Panel */}
      
        <div className="p-4 bg-gray-900">
          <h1 className="text-2xl font-bold text-white">Logo</h1>
        </div>

        <nav className="space-y-4 mt-4">
          <Link
            href="/dashboard"
            className="block p-2 hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Dashboard
          </Link>
          <Link
            href="/patient"
            className="block p-2 hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Patient-List
          </Link>
          <Link
            href="/product"
            className="block p-2 hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            Product-List
          </Link>
        </nav>
  
    </div>
  );
};

export default Sider;
