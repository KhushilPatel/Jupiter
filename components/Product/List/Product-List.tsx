import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';
import { useApi } from '@/store/context';
const PAGE_SIZE = 10;

const Product_List = () => {
  const [{ auth }] = useCookies(['auth']);
  const [productDetail, setProductDetail] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
const api=useApi()
  const ProductList = async () => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      const params = {
        skip: 0* PAGE_SIZE,
        take: PAGE_SIZE,
        search: searchQuery,
        orderBy: 'createdAt|desc',
        'search_column[]': ['name'],
      };

      // let response = await axios.get('https://jupiter.cmdev.cc/admin/product', {
      //   headers: payload,
      //   params: params,
      // });
      let response = await api.productsApi(payload, params);

      setProductDetail(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ProductList();
  }, [ searchQuery]);

  const loadMore = async (page: number) => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      const params = {
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
        search: searchQuery,
        orderBy: 'createdAt|desc',
        'search_column[]': ['name'],
      };
      let response = await api.productsApi(payload, params);

      setProductDetail({
        list: [...productDetail?.list, ...response?.data?.list],
        count: productDetail?.count + response?.data?.count,
        hasMany: response?.data?.hasMany,
        total: response?.data?.total,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, 1000);

  return (
    <div className='h-screen overflow-auto bg-gray-100 p-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>Product List</h1>
      <div className='flex items-center justify-between mb-4'>
        <input
          type='text'
          placeholder='Search by name...'
          className='w-full p-2 border rounded focus:outline-none focus:border-blue-300'
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={productDetail?.hasMany}
        loader={<RingLoader key={0} color='#007BFF' loading={true} size={40} />}
        useWindow={false}
        threshold={100}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {loading && <RingLoader key={0} color='#007BFF' loading={true} size={40} />}
          {productDetail?.list?.map((item: any, index: number) => (
            <div
              key={index}
              className='bg-white rounded-lg overflow-hidden shadow-md cursor-pointer'
              onClick={() => {
                router.push(`/product/${item?.id}`);
              }}
            >
              <img className='h-32 w-full object-cover' src={item?.image[0]?.description} alt='Sorry!There is not image' />
              <div className='p-4'>
                <div className='font-bold text-xl mb-2'>{item?.name}</div>
                <p className='text-gray-700'>{item?.dosage}gm</p>
                <p className='text-gray-700'>{item?.price}{'$'}</p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Product_List;
