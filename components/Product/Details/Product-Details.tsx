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
        <div className='bg-white p-6 rounded-lg shadow-md '>
     
          <p className='text-xl font-semibold'>ID: {productDetail?.name}</p>
       

        </div>
        
      ) : null}
    </div>

  );
};

export default Product_Details;
