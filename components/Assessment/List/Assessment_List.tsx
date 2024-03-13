import React, { useEffect, useState } from 'react';
import { useApi } from '@/store/context';
import { useCookies } from 'react-cookie';
import { RingLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';
import Select from 'react-select';


const PAGE_SIZE = 10;

const Assessment_List = () => {
  const [{ auth }] = useCookies(['auth']);
  const [loading, setLoading] = useState(true);
  const [assessmentDetail, setAssessmentDetail]:any = useState({
    list: [],
    count: 0,
    hasMany: false,
    total: 0,
  });
  const [selectedPatient, setSelectedPatient] = useState('');

  const api = useApi();

  const assessmentList = async () => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };
      const params = {
        skip:0,
        take: PAGE_SIZE,
        orderBy: 'createdAt|desc',
        'include[]': [
          'service',
          'assessmentHasPatientProfile',
          'assessmentHasTreatmentProduct',
          'assessmentHasCharge',
          'prescriberUser',
        ],
        search: '',
      };
      const response = await api.assessmentManagementApi(payload, params);
      setAssessmentDetail(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching Assessment details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    assessmentList();
  }, []);

  const loadMore = async (page:any) => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };

      const params = {
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
        search: '',
        orderBy: 'createdAt|desc',
        'include[]': [
          'service',
          'assessmentHasPatientProfile',
          'assessmentHasTreatmentProduct',
          'assessmentHasCharge',
          'prescriberUser',
        ],
      };

      const response = await api.assessmentManagementApi(payload, params);

      setAssessmentDetail((prevData:any) => ({
        list: [...prevData?.list, ...response?.data?.list],
        count: prevData?.count + response?.data?.count,
        hasMany: response?.data?.list?.length === PAGE_SIZE,
        total: response?.data?.total,
      }));
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching assessment details:', error);
    } finally {
      setLoading(false);
    }
  };

  const options = assessmentDetail.list.map((item:any) => ({
    value: item.id,
    label: `${item?.assessmentHasPatientProfile?.firstName} ${item?.assessmentHasPatientProfile?.lastName}`,
  }));

  return (
    <div className="flex flex-col w-1/4 pr-8 rounded-lg h-screen bg-gray-100">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Assessment Mgmt.</h1>
      </div>

      <div className="flex-1 p-4 flex flex-col list-disc pl-4 h-screen gap-6 overflow-auto">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && assessmentDetail?.hasMany}
          loader={<RingLoader key={0} color="#007BFF" loading={true} size={0} />}
          useWindow={false}
          threshold={100}
        >
          <label className="text-lg font-bold mb-2">Select Patient:</label>
          <Select
            value={selectedPatient}
            onChange={(value:any) => setSelectedPatient(value)}
            options={options}
            isLoading={loading}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Assessment_List;
