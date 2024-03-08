import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

const Product_Details = () => {
  const [productDetail, setproductDetail]: any = useState({});
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const router = useRouter();
  const { details } = router.query;
  const [{ auth }] = useCookies(['auth']);


  const ProductList = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      let response = await axios.get(`https://jupiter.cmdev.cc/admin/product/${details}`, { headers: payload });
      setproductDetail(response.data);
    } catch (error) {
      console.error('Data not retrieved', error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    if (details) {
      // Load data only if 'd' exists
      ProductList();
    }
  }, [details]);

  return (
     <div className='container mx-auto mt-8 p-8 '>
      <h1 className='font-bold text-4xl mb-4'>Product Details</h1>
      {!details && <p>Click on Product-list to see the details of the patient</p>}
      {loading ? (
        <RingLoader color='#007BFF' size={60}  />
      ) : Object.keys(productDetail).length > 0 ? (
        <div className='bg-red-300 p-6 rounded-lg shadow-md '>
     
          <p className='text-3xl font-semibold text-center'>Name: {productDetail?.name}</p>
       
       <div className='flex'>
        <div className='flex border-2 border-amber-100 rounded-md object-center '>
        <img className='rounded-md ' src={productDetail?.image[0]?.description} alt="Not Image Found" />
        </div>
        <div className="flex flex-col mt-20 ml-5 pl-32  w-full content-center  gap-7  ">
        <p className='text-xl font-serif font-medium  border-2 p-4 border-black rounded-md bg-orange-100'>id={productDetail?.id}</p>
        <p className='text-xl font-serif font-medium border-2  p-4 border-black rounded-md bg-orange-100 '>Condition-Level="{productDetail?.conditionLevel}"</p>
   
        </div>
       </div>
        </div>
        
      ) : null}
    </div>

  );
};

export default Product_Details;
