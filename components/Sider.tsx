
import React from 'react'

const Sider = () => {
  return (
    <div  className="flex h-screen bg-gray-100">
      {/* Left Panel */}
   <div className="w-1/6 bg-gray-800 text-white">
   <div className="p-4">
     <h1 className="text-2xl font-bold">Logo</h1>
   </div>
   
   {/* Add navigation links or icons for the left panel */}
   <nav className="space-y-4 mt-4">
     <a href="#" className="block p-2 hover:bg-gray-700">Dashboard</a>
     <a href="#" className="block p-2 hover:bg-gray-700">Statistics</a>
     <a href="#" className="block p-2 hover:bg-gray-700">Users</a>
     {/* Add more links as needed */}
   </nav>
 </div>
    </div>
  )
}

export default Sider


