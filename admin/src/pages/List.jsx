import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list')
      if (response.data.success) {
        // console.log(response.data);
        setList(response.data?.product || []);

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove',{id} ,{ headers: { token } })
      if (response.data.success) {
        // console.log(response.data);
        toast.success(response.data.message)
        await fetchList();

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div>
      <p>All Proucts List</p>
      {/* List Table Title */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
        <b>Images</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {/* product List */}
      {
        list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 gap-2 px-2 border bg-gray-100 text-sm font-semibold' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className='text-right text-lg cursor-pointer md:text-center' onClick={() => removeProduct(item._id)}>X</p>
          </div>
        ))
      }
    </div>
  )
}

export default List
