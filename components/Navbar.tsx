import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/store/auth';
import { Cookies } from 'react-cookie';
import Image from 'next/image';
import logo from '@/components/Images/login.png'
const NavbarRoute = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("auth")
    router.push('/login')
  }

  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid flex gap-4  me-auto mb-2 mb-lg-0 space-x-1">
          <div className="logo pt-2 pl-6">
            <Image src={logo} width={50} height={20} alt="error" />

          </div>

          <div className="flex gap-[330px] py-1">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex space-x-7">
         
              <li className="nav-item">
                <Link className="nav-link" href="/register">Register</Link>
              </li>
              <div>

                <button onClick={logout} className='bg-red-500'>Logout</button>
              </div>
            </ul>
            <form className="flex justify-end space-x-3  " role="search">

              <div className='search-bar'>
                <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                <button className="search text-sm h-7 my-4 " type="submit" onClick={e => { alert("sorry,we can't search") }}>Search</button>
              </div>

            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarRoute
