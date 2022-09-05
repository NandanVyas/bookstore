import React from 'react'
import Delivery from "../components/Delivery";
import Review from '../components/Review';
import Link from "next/link";

import {
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/Ai";
import { BsFillCartCheckFill } from "react-icons/Bs";

const checkout = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {
  return (
  <div className='container px-2 sm:m-auto'>
    <div className=' text-3xl text-center font-bold my-8 '>Checkout</div>
    <Delivery />
    <Review cart={cart} addToCart={addToCart} removeFromCart ={removeFromCart} subTotal={subTotal}/>
    
    
    <Link href={'/order'}><button className="flex mr-4  text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg">
            {" "}
            <BsFillCartCheckFill className="m-1" /> Pay ₹{subTotal}
          </button></Link>
    </div>
  )
}

export default checkout