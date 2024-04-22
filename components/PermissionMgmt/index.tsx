import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useApi } from "@/Contextstore/context";
import { RingLoader } from "react-spinners";
import axios from "axios";
import AddPermission from './Add/index';
const PAGE_SIZE = 10;

const PermissionTable = () => {
  const [{ auth }] = useCookies(["auth"]);
  const [permissionData, setPermissionData]: any = useState({ list: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const getTotalPages = () => {
    return Math.ceil(permissionData.total / PAGE_SIZE);
  };

  useEffect(() => {
    PermissionList();
  }, [currentPage]);

  const PermissionList = async () => {
    try {
      setLoading(true);
      const payload = {
        Authorization: `Bearer ${auth}`,
      };
      const params = {
        skip: (currentPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        search: "",
        orderBy: "createdAt|desc",
        include: "updatedBy",
      };
      const response = await axios.get(`https://jupiter.cmdev.cc/admin-permission-group`, {
        headers: payload,
        params: params
    } )
      setPermissionData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching Permission details:", error);  
      setLoading(false);
    } 
  };         

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);  
    return date.toLocaleString();
  };

  const getStatusColor = (status: any) => {
    return status === "ENABLED" ? "text-green-500" : "text-red-500";
  };

  const handlePageChange = async (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleRemoveItem = (itemId: string) => {
   
    const updatedList = permissionData.list.filter((item: any) => item.id !== itemId);
    
    setPermissionData({ ...permissionData, list: updatedList });
  };

  console.log("permissionData",permissionData.list)
  return (
    <div className="ml-3 mt-4">
      <div className="flex justify-between">
        <div>
          <h1>Permission Management</h1>
          <p>
            Assign roles and permissions to users to perform particular system
            functions.
          </p>
        </div>
        <div className="mt-7 mr-3">
          <AddPermission name={"Add Permission"} />
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
            <RingLoader color="#4A90E2" loading={loading} />
          </div>
        )}
        <table
          className={`min-w-full bg-white rounded-lg ${
            loading ? "opacity-50" : ""
          }`}
        >
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Role Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Permission Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Updated By
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Updated Date
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Status
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 h-full overflow-auto">
            {permissionData.list.map((item: any) => (
              <tr key={item.id}>
                <td className="text-left py-3 px-4">{item?.role}</td>
                <td className="text-left py-3 px-4">{item?.name}</td>
                <td className="text-left py-3 px-4">
                  {item?.updatedBy?.firstName ?? "-"}{" "}
                  {item?.updatedBy?.lastName}
                </td>
                <td className="text-left py-3 px-4">
                  {formatDate(item?.updatedAt)}
                </td>
                <td
                  className={`text-left py-3 px-4 ${getStatusColor(
                    item?.status
                  )}`}
                >
                  {item?.status}
                </td>
                <td className="text-left py-3 px-4 flex gap-3">
                <AddPermission name={"Edit Permission"}  Editdetails={item}/>
                  {/* <EditPermission name={"Edit Permission"} Editdetails={item}/> */}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold -py-2 -px-2  rounded"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 ">
          {Array.from({ length: getTotalPages() }).map((_, index) => (
            <button 
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 rounded-1xl ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div> 
      </div>
    </div>
  );
};

export default PermissionTable;