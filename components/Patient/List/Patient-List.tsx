import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { RingLoader } from 'react-spinners';
import Patient_details from '@/components/Patient/Details/Patient_details';
import { Avatar } from "evergreen-ui"
import { useApi } from "@/Contextstore/context"
import debounce from 'lodash.debounce';
const PAGE_SIZE = 10;
const Patient_List = () => {
    const [table, setTable]: any = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [searchQuery, setSearchQuery]:any = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [{ auth }] = useCookies(['auth']);
    const router = useRouter();
const api = useApi();
    // Pagination
    const getTotalPages = () => {
        return Math.ceil(table.total / PAGE_SIZE);
    };

    const PatientList = async () => {
        try {
            setLoading(true);
            const payload = {
                Authorization: `Bearer ${auth}`,
            };

            // let response = await axios.get('https://jupiter.cmdev.cc/admin/patient-user', {
            //     headers: payload,
            //     params: { skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE, search: searchQuery },
            // });
            let response = await api.patientsApi(payload, { skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE, search: searchQuery });
            console.log('patient details', response);
            setTable(response.data);
        } catch (error) {
            console.error('Data not retrieved', error);
        } finally {
            setLoading(false);
        }
    };

    const Search = async () => {
        try {
            setLoading(true);
            const payload = {
                Authorization: `Bearer ${auth}`,
            };

            // let response = await axios.get('https://jupiter.cmdev.cc/admin/patient-user', {
            //     headers: payload,
            //     params: { search: searchQuery },
            // });
            let response = await api.patientsApi(payload, { skip: (currentPage - 1) * PAGE_SIZE, take: PAGE_SIZE, search: searchQuery });
            console.log('patient details after search', response);
            setTable(response.data);
        } catch (error) {
            console.error('Data not retrieved', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        PatientList();
    }, [currentPage]);

    useEffect(() => {
        Search();
    }, [searchQuery]);

    const handlePageChange = async (newPage: any) => {
        setPaginationLoading(true); 
        try {
            setCurrentPage(newPage);
        } finally {
            setPaginationLoading(false);
        }
    };


  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 500);

    return (
        <div className='flex h-full '>
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
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
                </div>
                <div className='overflow-y-auto min-h-screen px-4'>
                    {loading ? (
                        <RingLoader color='#007BFF' loading={loading} size={40} />
                    ) : (
                        <>
                            <ul className='flex flex-col list-disc pl-4 h-screen gap-6 overflow-auto'>
                                {table?.list?.map((item: any) => {
                                    return (
                                        <div className='flex border-b-2 py-2 items-center cursor-pointer transition duration-300 hover:bg-gray-100'>
                                            <div className='mr-4'>
                                                <Avatar name={`${item.firstName} ${item.lastName}`} key={item._id} size={40} />
                                            </div>
                                            <div>
                                                <li
                                                    key={item.id}
                                                    onClick={() => router.push({
                                                        query: { d: item?.id },
                                                    })}
                                                    className='mb-2 font-bol
                                                     text-lg'
                                                >
                                                    {item?.firstName} {item?.lastName}
                                                </li>
                                            </div>
                                        </div>
                                    );
                                })}
                            </ul>
                            <div className='flex justify-center mt-4 h-full'>
                                {Array.from({ length: getTotalPages() }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`mx-2 rounded-1xl ${
                                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                            }`}
                                    >
                                        {paginationLoading && currentPage === index + 1 ? (
                                            <RingLoader color='#ffffff' loading={paginationLoading} size={20} />
                                        ) : (
                                            index + 1
                                        )}
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

export default Patient_List;
