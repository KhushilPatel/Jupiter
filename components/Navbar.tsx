import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/store/auth';
// import Cookies from 'js-cookie';
const NavbarRoute = () => {
    const router=useRouter();
    const {LogoutUser}:any=useAuth()
    const logout=async()=>{
      try {
       LogoutUser()
       router.push('/login')
      } catch (error:any) {
        console.log(error.message);
        
        
      }
    }
  
    return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary"> 
        <div className="container-fluid flex gap-24  me-auto mb-2 mb-lg-0 space-x-7">
            <div className="logo pt-2">

          <Link className="navbar-brand" href="/home">LOGO</Link>
            </div>
  
          <div className="flex gap-[490px] py-1">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex space-x-7">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/register">Register</Link>
              </li>
              <div>

              <button onClick={logout}>Logout</button>
              </div>
            </ul>
            <form className="flex justify-end space-x-3  " role="search">
              
              <div className='search-bar'>
              <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
              <button className="search text-sm h-7 my-4 " type="submit" onClick={e=>{alert("sorry,we can't search")}}>Search</button>
              </div>
            
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarRoute
