import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const PAGE_SIZE = 10;


const Product_List = () => {
    const [{ auth }] = useCookies(['auth']);
  const [productDetail, setProductDetail]: any = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const getTotalPages = () => {
    return Math.ceil(productDetail?.total / PAGE_SIZE);
  };



  const ProductList = async () => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };
    
      const params = {
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        search: searchQuery,
        orderBy: "createdAt|desc", 
        'search_column[]': ['name'],
    };
      let response = await axios.get('https://jupiter.cmdev.cc/admin/product', {
        headers: payload,
        params: params
      });
      console.log('product details', response);

      setProductDetail(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ProductList();
  }, [currentPage,searchQuery]);
 

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='h-screen overflow-auto'>
       <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h1>
      <div className='flex items-center justify-between mb-4 px-4'>
        <input
          type='text'
          placeholder='Search by name...'
          className='w-full p-2 border rounded focus:outline-none focus:border-blue-300'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className='w-full border border-collapse'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border p-4'>Product Name</th>
            <th className='border p-4'>Images</th>
            <th className='border p-4'>Dosage</th>
          </tr>
        </thead>
        {loading ? (
            <RingLoader color='#007BFF' loading={loading} size={40} />
          ) : (
        <tbody>
          {productDetail?.list?.map((item: any, index: number) => (
        
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className='border p-4 cursor-pointer'  key={item.id}
            onClick={()=>{router.push(`/product/${item?.id}`)}}>{item?.name}</td>
              <td className='border p-4'>
                <img className='h-32 mx-auto' src={item?.image[0]?.description} alt="Product Image" />
              </td>
              <td className='border p-4'>{item?.dosage}{item?.dosageUnit === "NUMBER" ? "Capsule" : item?.dosageUnit}</td>
            </tr>
       
          ))}
        </tbody>
      )}
      </table>

    {/* Pagination */}
<div className='flex justify-center mt-4'>
  {currentPage > 1 && (
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className='mx-2 rounded-1xl bg-gray-300'
    >
      &lt; Prev
    </button>
  )}

  {currentPage > 2 && (
    <button
      onClick={() => handlePageChange(1)}
      className={`mx-2 rounded-1xl bg-gray-300`}
    >
      1
    </button>
  )}

  {currentPage > 3 && (
    <span className='mx-2 text-lg'>...</span>
  )}

  {Array.from({ length: Math.min(3, getTotalPages()) }).map((_, index) => {
    const page = currentPage - 1 + index;
    return (
      page <= getTotalPages() && (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`mx-2 rounded-1xl ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          {page}
        </button>
      )
    );
  })}

  {currentPage + 3 < getTotalPages() && (
    <span className='mx-2 text-lg'>...</span>
  )}

  {currentPage + 3 <= getTotalPages() && (
    <button
      onClick={() => handlePageChange(getTotalPages())}
      className={`mx-2 rounded-1xl ${
        currentPage === getTotalPages() ? 'bg-blue-500 text-white' : 'bg-gray-300'
      }`}
    >
      {getTotalPages()}
    </button>
  )}

  {currentPage < getTotalPages() && (
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className='mx-2 rounded-1xl bg-gray-300'
    >
      Next &gt;
    </button>
  )}
</div>
    </div>
  )
}

export default Product_List
