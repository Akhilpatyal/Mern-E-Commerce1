import React from 'react'

const NewLetterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
    return (
        <div className='text-center'>
            <p className='text-gray-800 text-2xl font-medium'>Subscribe Now & Get 20% off</p>
            <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, in.</p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-2xl border-none bg-gray-300'>
                <input type="email" placeholder='Enter your mail' className='w-full sm:flex-1 outline-none rounded-r-2xl' />
                <button type='submit' className='bg-black text-amber-100 text-xs px-10 py-5 cursor-pointer rounded-2xl'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewLetterBox
