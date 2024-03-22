import React from 'react'
import PermissionTable from '@/components/PermissionMgmt'
import Sider from '@/components/UI/Sider'
const index = () => {
  return (
    <div className="flex">
    <div className="w-[20%] h-screen">
      <Sider />
    </div>
    <div className="w-full h-screen">
     <PermissionTable />
    </div>
  </div>
  )
}

export default index
