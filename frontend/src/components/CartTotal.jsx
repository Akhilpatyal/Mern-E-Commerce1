import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
const CartTotal = () => {
    const {currency,deliveryFee,getCartAmount}=useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'cart'} text2={'Total'}/>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>SubTotal</p>
            <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>{currency} {deliveryFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
        <p>Total</p>
        <p>{currency} {getCartAmount()==0?0:getCartAmount()+deliveryFee}.00</p>
        </div>

      </div>
    </div>
  )
}

export default CartTotal
