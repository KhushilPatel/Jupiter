import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { RingLoader } from 'react-spinners';
import Patient_details from '@/components/Patient_details';
import { Avatar } from "evergreen-ui"

const PAGE_SIZE = 10;
const Patient = () => {
  const [table, setTable]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [{ auth }] = useCookies(['auth']);
  const router = useRouter();
  
  //Pagination
  const getTotalPages = () => {
    return Math.ceil(table.total / PAGE_SIZE);
  };
  const PatientList = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      let response = await axios.get('https://jupiter.cmdev.cc/admin/patient-user', {
        headers: payload,
        params: { skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE, search: searchQuery },
      });

      setTable(response.data);
    } catch (error) {
      console.error('Data not retrieved', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PatientList();
  }, [searchQuery,currentPage]);

  //Pagination
  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='flex'>
      <div className='w-1/4 pr-8 bg-gray-100 rounded-lg'>
        <div className='text-center mb-8'>
          <h1 className='font-bold text-4xl py-4 bg-red-300 rounded-t-lg'>Patient List</h1>
        </div>
        <div className='flex items-center justify-between mb-4 px-4'>
          <input
            type='text'
            placeholder='Search by name...'
            className='w-full p-2 border rounded focus:outline-none focus:border-blue-300'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='overflow-y-auto max-h-screen px-4'>
          {loading ? (
            <RingLoader color='#007BFF' loading={loading} size={40} />
          ) : (
            <>
            <ul className='list-disc pl-4 h-[500px]'>
              {table?.list?.map((item: any) => {
                return (
                  <div className='flex '>
                    <div className='py-2'>

                      <Avatar name={`${item.firstName} ${item.lastName}`} key={item._id} />
                    </div>
                    <div>

                      <li
                        key={item.id}
                        onClick={() => router.push({
                          query: { d: item?.id },
                        })}
                        className='mb-2 hover:bg-gray-200 transition duration-300 p-2 rounded cursor-pointer'
                      >
                        {item?.firstName} {item?.lastName}
                      </li>
                    </div>
                  </div>
                );
              })}
            </ul>
             <div className='flex justify-center mt-4'>
             {Array.from({ length: getTotalPages() }).map((_, index) => (
               <button
                 key={index}        
                 onClick={() => handlePageChange(index + 1)}
                 className={`mx-2 rounded-1xl ${
                   currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                 }`}
               >
                 {index + 1}
               </button>
             ))}
           </div>
           </>
          )}
        </div>
      </div>
      <div className='overflow-x-auto w-3/4'>
        <Patient_details />
      </div>
    </div>
  );
};

export default Patient;
