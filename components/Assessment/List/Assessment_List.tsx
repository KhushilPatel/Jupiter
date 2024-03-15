import React, { useEffect, useState } from "react";
import { useApi } from "@/store/context";
import { useCookies } from "react-cookie";
import { RingLoader } from "react-spinners";
import Select from "react-select";

const PAGE_SIZE = 20;

const Assessment_List = () => {
  const [{ auth }] = useCookies(["auth"]);
  const [loading, setLoading] = useState(true);
  const [assessmentDetail, setAssessmentDetail]:any = useState({
    list: [],
    count: 0,
    hasMany: false,
    total: 0,
  });
  const [selectedPerson, setSelectedPerson] = useState(null);
  const api = useApi();
  const [currentPage, setCurrentPage] = useState(1); // Track current page

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
        skip: (currentPage - 1) * PAGE_SIZE, // Calculate skip based on current page
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

  const options = assessmentDetail?.list?.map((item:any) => ({
    value: item.id,
    label: `${item?.assessmentHasPatientProfile?.firstName} ${item?.assessmentHasPatientProfile?.lastName}`,
  }));

  return (
    <div className="flex flex-col w-full pr-8 rounded-lg bg-gray-100 h-screen overflow-hidden">
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Assessment Mgmt.</h1>
      </div>
      {!loading && assessmentDetail.hasMany && (
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        )}
      <div className="flex-1 p-4 flex flex-col list-disc pl-4 gap-6 overflow-auto h-full">
        {loading && (
          <RingLoader key={0} color="#007BFF" loading={true} size={40} />
        )}
        <label className="text-lg font-bold mb-2">Select Patient:</label>
        <Select
          menuIsOpen={true}
          value={selectedPerson}
          noOptionsMessage={() => "Uh-oh nothing matches your search"}
          onChange={(selectedOption:any) => setSelectedPerson(selectedOption)}
          options={options}
          isLoading={loading}
          isSearchable
          classNamePrefix={"react-select"}
          isClearable={true}
        />
       
      </div>
    </div>
  );
};

export default Assessment_List;


