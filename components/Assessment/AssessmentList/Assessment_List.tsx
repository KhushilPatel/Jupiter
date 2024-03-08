import React from 'react';

const Assessment_List = () => {
  
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Assessment Mgmt.</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Assessment No.</th>
            <th className="border border-gray-300 p-2">Products</th>
            <th className="border border-gray-300 p-2">Service</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Prescriber</th>
            <th className="border border-gray-300 p-2">Patient</th>
            <th className="border border-gray-300 p-2">Date & Time</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Add your table data rows here */}
          <tr>
            <td className="border border-gray-300 p-2">1</td>
            <td className="border border-gray-300 p-2">Product A</td>
            <td className="border border-gray-300 p-2">Service A</td>
            <td className="border border-gray-300 p-2">Type A</td>
            <td className="border border-gray-300 p-2">Prescriber A</td>
            <td className="border border-gray-300 p-2">Patient A</td>
            <td className="border border-gray-300 p-2">2024-03-07 12:00 PM</td>
            <td className="border border-gray-300 p-2">$100</td>
            <td className="border border-gray-300 p-2">Pending</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Assessment_List;
