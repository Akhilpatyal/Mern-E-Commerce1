import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewLetterBox from '../components/NewLetterBox'

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'Contact'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col gap-10 mb-28 md:flex-row">
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col gap-6 items-start justify-center'>
          <p className='font-semibold text-gray-600 text-xl'> Our Store</p>
          <p className='text-gray-500'> 123 Main St,<br /> Anytown, USA 12345</p>
          <p className='text-gray-500'>tel: 555-555-5555 <br />Email: example@gmail.com</p>
          <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
          <p className='text-gray-500'> Learn More About Our Team and job openings</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default Contact
