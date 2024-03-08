import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React from 'react';

const Sider = () => {
const router=useRouter()
  return (
    <div className="flex flex-col h-full bg-gray-100">
          
          <div className="p-4 bg-gray-900">
            <h1 className="text-2xl font-bold text-white">Logo</h1>
          </div>

          <nav className="space-y-4 mt-4">
            <Link
            href="/dashboard"
            className={`block p-2 hover:bg-gray-700 transition duration-300 ease-in-out ${router.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}
            >
            Dashboard
            </Link>
            <Link
            href="/patient"
            className={`block p-2 hover:bg-gray-700 transition duration-300 ease-in-out ${router.pathname === '/patient' ? 'bg-gray-700' : ''}`}
            >
            Patient-List
            </Link>
            <Link
            href="/product"
            className={`block p-2 hover:bg-gray-700 transition duration-300 ease-in-out ${router.pathname === '/product' ? 'bg-gray-700' : ''}`}
            >
            Product-List
            </Link>
            <Link
            href="/Assessment"
            className={`block p-2 hover:bg-gray-700 transition duration-300 ease-in-out ${router.pathname === '/Assessment' ? 'bg-gray-700' : ''}`}
            >
            Assessment-Mgmt.
            </Link>
          </nav>
        </div>
        )
}

export default Sider;
