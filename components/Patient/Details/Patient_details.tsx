import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { useApi } from '@/store/context';
const Patient_details = () => {
  const [table, setTable]: any = useState({});
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const router = useRouter();
  const { d } = router.query;
  const [{ auth }] = useCookies(['auth']);
const api = useApi();

  const PatientList = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      // let response = await axios.get(`https://jupiter.cmdev.cc/admin/patient-user/${d}`, { headers: payload });
      const response=await api.patientDetailsApi(payload,d);
      setTable(response.data);
    } catch (error) {
      console.error('Data not retrieved', error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    if (d) {
      // Load data only if 'd' exists
      PatientList();
    }
  }, [d]);

  return (
    <div className='container mx-auto mt-8 p-8 '>
      <h1 className='font-bold text-4xl mb-4'>Patient Details</h1>
      {!d && <p>Click on patient-list to see the details of the patient</p>}
      {loading ? (
        <RingLoader color='#007BFF' size={60}  />
      ) : Object.keys(table).length > 0 ? (
        <div className='bg-white p-6 rounded-lg shadow-md '>
     
          <p className='text-xl font-semibold'>ID: {table.id}</p>
          <p className='text-xl font-semibold'>Name: {table.firstName}</p>
          <p className='text-lg'>Gender: {table.gender}</p>
          <p className='text-lg'>DOB: {table.dob}</p>
          <p className='text-lg'>Is Pregnant: {table.isPregnant ? 'Yes' : 'No'}</p>
          <p className='text-lg'>Email: {table.email}</p>
          <p className='text-lg'>City: {table.city}</p>
          <p className='text-lg'>Province: {table.province}</p>
          <div className=" bg-gray-800 p-6 rounded-lg shadow-md ">

<div className="mt-4 text-white text-lg font-semibold">{table.uniqueId}</div>
<div className="flex justify-between items-center mt-4">
  <div className="text-sm text-gray-400">Card Holder</div>
  <div className="text-white">{table.firstName} {table.lastName}</div>
</div>
<div className="flex justify-between items-center mt-2 ">
  <div className="text-sm text-gray-400">Expires</div>
  <div className="text-white">{table?.tempEmail?.expireAt}</div>
</div>
</div>
        </div>
        
      ) : null}
    </div>
  );
};

export default Patient_details;
