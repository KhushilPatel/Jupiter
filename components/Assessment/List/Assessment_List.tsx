import React, { useEffect, useState } from "react";
import { useApi } from "@/Contextstore/context";
import { useCookies } from "react-cookie";
import { RingLoader } from "react-spinners";
import CustomSelect from "@/components/UI/CustomSelect";
const PAGE_SIZE = 20;

const Assessment_List = () => {
  const [{ auth }] = useCookies(["auth"]);
  const [loading, setLoading] = useState(true);
  const [assessmentDetail, setAssessmentDetail]: any = useState({
    list: [],
    count: 0,
    hasMany: false,
    total: 0,
  });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const api = useApi();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    assessmentList();
  }, [currentPage]);

  const assessmentList = async () => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };
      const params = {
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy: "createdAt|desc",
        "include[]": [
          "service",
          "assessmentHasPatientProfile",
          "assessmentHasTreatmentProduct",
          "assessmentHasCharge",
          "prescriberUser",
        ],
        search: "",
      };
      const response = await api.assessmentManagementApi(payload, params);
      setAssessmentDetail({
        list: [...assessmentDetail.list, ...response.data.list],
        count: assessmentDetail.count + response.data.count,
        hasMany: response.data.hasMany,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Error fetching Assessment details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1); // Increment current page
  };

  const options = assessmentDetail?.list?.map((item: any) => ({
    value: item.id,
    label: `${item?.assessmentHasPatientProfile?.firstName} ${item?.assessmentHasPatientProfile?.lastName}`,
  }));

  // if (!loading && assessmentDetail.hasMany) {
  //   options.push({ value: "load-more", label: "Load More" });
  // }
  if(loading && assessmentDetail.hasMany){
    options.push( {label: <RingLoader key={0} color="#007BFF" loading={true} size={40} />});
  }
  return (
    <div className="flex flex-col w-full pr-8 rounded-lg bg-gray-100 h-screen overflow-hidden">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Assessment Mgmt.</h1>
      </div>
      <div className="flex-1 p-4 flex flex-col list-disc pl-4 gap-6 overflow-auto h-full">
      
        <label className="text-lg font-bold mb-2">Select Patient:</label>
        <CustomSelect
          options={options}
          value={selectedPerson}
          isLoading={loading}
          onChange={(selectedOption: any) => {
            setSelectedPerson(selectedOption)
          }}
          // onChange={(selectedOption:any) => {
          //   if (selectedOption.value === "load-more") {
          //     handleLoadMore();
          //   } else {
          //     setSelectedPerson(selectedOption);
          //   }
          // }}
          onMenuScrollToBottom={handleLoadMore} 
        ></CustomSelect>
      </div>
    </div>
  );
};

export default Assessment_List;
