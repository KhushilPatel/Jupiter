import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Patient_details from '@/components/Patient_details';
const patient = () => {
  const [table, setTable]: any = useState([]);
  const [{ auth }] = useCookies(['auth']);
  const router=useRouter()
  const PatientList = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      let response = await axios.get('https://jupiter.cmdev.cc/admin/patient-user', {
        headers: payload,
      });
      console.log(response.data)
      setTable(response.data);
    } catch (error) {
      console.error('Data not retrieved', error);
      // Handle error appropriately, e.g., show an error message
    }
  };

  useEffect(() => {
    PatientList();
  }, []);

  return (
    <div className='flex'>
      <div className='w-1/4 pr-8 bg-gray-100 rounded-lg'>
        <div className='text-center mb-8'>
          <h1 className='font-bold text-4xl py-4 bg-red-300 rounded-t-lg'>Patient List</h1>
        </div>
        <div className='overflow-y-auto max-h-screen px-4'>
          <ul className='list-disc pl-4 '>
            {table?.list?.map((item: any) => (
              <li onClick={()=>router.push({
                query: { d: item?.id }
              })} key={item.id} className='mb-2 hover:bg-gray-200 transition duration-300 p-2 rounded cursor-pointer'>
                {item?.firstName} {item?.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='overflow-x-auto w-3/4'>
        {/* Your main content (table) goes here */}
        <Patient_details/>
      </div>
    </div>
  );
};

export default patient;
