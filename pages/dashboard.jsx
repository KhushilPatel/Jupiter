
import React, { useState } from 'react';
import Head from 'next/head';
import NavbarRoute from '@/components/Navbar';
import { useRouter } from 'next/router';
import Patient_List from '@/pages/patient';

const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
  const router = useRouter()
  const handleNavItemClick = (item) => {
    setSelectedNavItem(item);
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>Dashboard</title>
      </Head>
      {/* Left Panel */}
      <div className="w-1/6 bg-gray-800 text-white sticky top-0 h-screen">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>
        <nav className="space-y-4 mt-4">
          <a
            href="#"
            className={`block p-2 hover:bg-gray-700 ${selectedNavItem === 'dashboard' ? 'bg-gray-700' : ''
              }`}
            onClick={() => handleNavItemClick('dashboard')}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`block p-2 hover:bg-gray-700 ${selectedNavItem === 'statistics' ? 'bg-gray-700' : ''
              }`}
            onClick={() => handleNavItemClick('statistics')}
          >
            Patient-List
          </a>

        </nav>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden ">
        {/* Navbar */}
        <header className="bg-white border-b-2 border-gray-200 sticky top-0">
          <NavbarRoute />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ">
          <div className="container mx-auto p-6">

            {selectedNavItem === 'dashboard' && (
              <div>
                <h2>Welcome To Dashboard</h2>
            
              </div>
            )}
            {selectedNavItem === 'statistics' && (
              <div>
                <Patient_List />
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
