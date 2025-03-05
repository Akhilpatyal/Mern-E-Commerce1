import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewLetterBox from '../components/NewLetterBox'
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About Us'} text2={'Us'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full  md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti culpa, nesciunt officia quas consequatur quae delectus laborum dolore quod deleniti?</p>
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa facere minus facilis? Similique magnam voluptate eligendi! Nobis quos, delectus laboriosam quas provident quaerat corrupti veniam placeat totam reprehenderit molestias, velit, fugiat aspernatur deserunt illo.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet, deserunt dolorem officia sapiente hic doloremque quaerat sit repellendus dicta debitis?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima commodi accusantium et, aliquid pariatur temporibus vel minus. Minus, asperiores fugit.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima commodi accusantium et, aliquid pariatur temporibus vel minus. Minus, asperiores fugit.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Services:</b>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima commodi accusantium et, aliquid pariatur temporibus vel minus. Minus, asperiores fugit.</p>
        </div>
      </div>
      <NewLetterBox/>
     
      
    </div>
  )
}

export default About
