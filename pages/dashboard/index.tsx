import React from 'react'
import Sider from '@/components/UI/Sider'
import NavbarRoute from '@/components/UI/Navbar'
const index = () => {
  return (
    <div className="flex gap-4">
    <div className="w-[20%]">
      <Sider />
    </div>
    <div className="w-full h-full">
     <NavbarRoute/>
    <div >Welcome to Dashboard</div>
    </div>
  </div>
  )
}

export default index
