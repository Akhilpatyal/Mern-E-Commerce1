import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} alt="" className='mb-5 w-32 '/>
        <p className='w-full md:w-2/3 text-gray-600'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, eum illum exercitationem aperiam, autem voluptatibus quo amet unde atque molestiae illo! Numquam, quisquam deserunt.
        </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>Company</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p text-xl font-medium mb-5>Get In Touch</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+1-212-456-8902</li>
          <li>example@gmail.com</li>
        </ul>
      </div>
    </div>
      <hr />
      <p className='py-5 text-sm text-center'> Copyright &copy;2025 forever.com , All Right Reserved</p>
    </div>
  )
}

export default footer
