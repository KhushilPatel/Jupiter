import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Patient_details = () => {
  const [table, setTable]: any = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { d } = router.query;
  const [{ auth }] = useCookies(['auth']);

  const PatientList = async () => {
    try {
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      let response = await axios.get(`https://jupiter.cmdev.cc/admin/patient-user/${d}`, { headers: payload });
      setTable(response.data);
    } catch (error) {
      console.error('Data not retrieved', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (d) {
      setLoading(true);
      PatientList();
    }
  }, [d]);

  return (
    <div className='container mx-auto mt-8 p-8 '>
      <h1 className='font-bold text-4xl mb-4'>Patient Details</h1>
      {loading ? (<>
          <RingLoader color='#007BFF' css={override} size={60} />
      </> 
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
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Click on patients to see their details</p>
      )}
    </div>
  );
};

export default Patient_details;



//Old code without Loader


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useRouter } from 'next/router';

// const Patient_details = () => {
//   const [table, setTable]: any = useState({});
//   const router = useRouter();
//   const { d } = router.query;
//   const [{ auth }] = useCookies(['auth']);

//   const PatientList = async () => {
//     try {
//       const payload = {
//         Authorization: `Bearer ${auth}`,
//       };

//       let response = await axios.get(`https://jupiter.cmdev.cc/admin/patient-user/${d}`, { headers: payload });
//       setTable(response.data);
//     } catch (error) {
//       console.error('Data not retrieved', error);
//     }
//   };

//   useEffect(() => {
//     if (d) {
//       PatientList();
//     }
//   }, [d]);

//   return (
//     <div className='container mx-auto mt-8 p-8'>
//       <h1 className='font-bold text-4xl mb-4'>Patient Details</h1>
//       {Object.keys(table).length > 0 ? (
//         <div className='bg-white p-6 rounded-lg shadow-md'>
//           <p className='text-xl font-semibold'>ID: {table.id}</p>
//           <p className='text-xl font-semibold'>Name: {table.firstName}</p>
//           <p className='text-lg'>Gender: {table.gender}</p>
//           <p className='text-lg'>DOB: {table.dob}</p>
//           <p className='text-lg'>Is Pregnant: {table.isPregnant ? 'Yes' : 'No'}</p>
//           <p className='text-lg'>Email: {table.email}</p>
//           <p className='text-lg'>City: {table.city}</p>
//           <p className='text-lg'>Province: {table.province}</p>
//           {/* Add more details as needed */}
//         </div>
//       ) : (
//         <p>Click on patients to see their details</p>
//       )}
//     </div>
//   );
// };

// export default Patient_details;