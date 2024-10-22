import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux';

const MobileNav = () => {
  const role = useSelector((state)=>state.auth.role)

  return (
   <>
   {role === "user" &&  <div className='w-full flex lg:hidden items-center justify-between my-8'>
      <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300ms'
            >
                Favourites
            </Link>
            <Link
            to="/profile/orderHistory"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300ms'
            >
                Order History
            </Link>
            <Link
            to="/profile/settings"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300ms'
            >
                Settings
            </Link>
    </div>}
    {role === "admin" &&  <div className='w-full flex lg:hidden items-center justify-between my-8'>
      <Link
            to="/profile"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300ms'
            >
                All Orders
            </Link>
            <Link
            to="/profile/add-book"
            className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300ms'
            >
                Add Book
            </Link>
            
    </div>}
   </>
  )
}

export default MobileNav

