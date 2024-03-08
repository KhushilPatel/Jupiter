import React, { useState } from 'react';
import Head from 'next/head';
import NavbarRoute from '@/components/UI/Navbar';
import { useRouter } from 'next/router';
import Patient_List from '@/components/Patient/List/Patient-List';
import Product_List from '@/components/Product/List/Product-List';
import Assessment_List from '@/components/Assessment/AssessmentList/Assessment_List';
import Sider from '@/components/UI/Sider';
const Dashboard = () => {
  const [selectedNavItem, setSelectedNavItem] = useState('dashboard');
  const router = useRouter();

  const handleNavItemClick = (item:any) => {
    setSelectedNavItem(item);
  };

  return (
    <div className="flex h-full bg-gray-100">
      <Head>
        <title>Dashboard</title>
      </Head>
     <div className='w-[17%] min-h-screen'>
      <Sider/>
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
            {selectedNavItem === 'Patient-List' && (
              <div>
                <Patient_List />
              </div>
            )}
            {selectedNavItem === 'Product-List' && (
              <div>
                <Product_List />
              </div>
            )}
            {selectedNavItem === 'Assessment Mgmt.' && (
              <div>
                <Assessment_List />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
