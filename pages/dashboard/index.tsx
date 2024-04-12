import React from 'react'
import Sider from '@/components/UI/Sider'
import NavbarRoute from '@/components/UI/Navbar'
import { useRouter } from 'next/router'
const index = () => {
  const router=useRouter()
  return (
    <div className="flex gap-4">
    <div className="w-[20%]">
      <Sider />
    </div>
    <div className="w-full h-full">
     <NavbarRoute/>
    <div >Welcome to Dashboard</div>
    <button  onClick={()=>router.push('/home')}className='bg-blue-500'>
      Go to home page
    </button>
    </div>
  </div>
  )
}

export default index
