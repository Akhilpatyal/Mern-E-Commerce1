import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

function Orders() {
  const { backendURL, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])
  const loadOrderData = async()=> {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendURL + '/api/order/userorders', {}, { headers: { token } })
      console.log(response.data.orders);
      if (response.data.success) {
        let allOrderItems=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            
            item['date']=order.date 
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse());
      }

    } catch (error) {

    }
  }
useEffect(()=>{
  loadOrderData()
},[token])
  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'My'} text2={'Orders'} />
      </div>
      <div className="">
        {
          orderData.map((items, index) => (
            <div key={index} className="flex flex-col md:flex-row py-4 border-t text-gray-600 md:items-center md:justify-between gap-4">
              <div className="flex items-start-gap-6 text-sm">
                <img src={items.image[0]} className='w-16 sm:w-20' alt="" />

                <div>
                  <p className='sm:text-base font-medium'>{items.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-400'>
                    <p className='text-lg'>{currency} {items.price}</p>
                    <p>Quantity: {items.quantity}</p>
                    <p> Size :{items.size}</p> 
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'> {new Date(items.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'> {items.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-fu;; bg-green-500'></p>
                  <p className='text-sm md:text-base '>{items.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
