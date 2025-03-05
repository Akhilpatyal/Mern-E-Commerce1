import React, { useContext, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
function Navbar() {
  const[visible,setVisivle]=useState(false);
  const{setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);

  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}><img src={assets.logo} alt="" className='w-25' /></Link>
      <ul className="hidden sm:flex gap-3 text-sm">
        <NavLink to='/' className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to='/Collection' className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to='/About' className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to='/Contact' className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-5 cursor-pointer' />
        <div className="group relative">
          <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
          {/* dropdown menu */}
         
          {token && 
           <div className='group-hover:block hidden absolute dropdown-menu pt-2 right-0'>
           <div className="flex flex-col gap-2 w-36 px-5 bg-slate-100 py-3 text-gray-500 rounded">
             <p className='cursor-pointer hover:text-black'>My Profile</p>
             <p onClick={()=>navigate('/Order')} className='cursor-pointer hover:text-black'>Order</p>
             <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
           </div>
         </div> 
          }
        </div>
        <Link to="/Cart" className="relative">
        <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer min-w-5' />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white leading-4 rounded-full aspect-square text-[-6px]'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisivle(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* menu bar for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gray-500 transition-all ${visible ?'w-full':'w-0'} `}>
        <div className="flex flex-col  bg-gray-300">

          <div className="flex items-center gap-4 p-3 cursor-pointer" onClick={()=>setVisivle(false)}>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div> 

          <NavLink className='py-2 pl-6 border-b-1 text-center' onClick={()=>setVisivle(false)} to="/">Home</NavLink>
          <NavLink className='py-2 pl-6 border-b-1 text-center' onClick={()=>setVisivle(false)} to="/Collection">Collection</NavLink>
          <NavLink className='py-2 pl-6 border-b-1 text-center' onClick={()=>setVisivle(false)} to="/About">About</NavLink>
          <NavLink className='py-2 pl-6 border-b-1 text-center' onClick={()=>setVisivle(false)} to="/Contact">Contact</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
