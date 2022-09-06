import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/Ai'
import SideBar from './SideBar'

const NavBar = ({cart, addToCart,  removeFromCart, clearCart, subTotal}) => {
  //console.log(cart, addToCart,  removeFromCart, clearCart, subTotal)
  return (
    <div className='flex justify-between flex-col items-center md:flex-row md:justify-start py-1 shadow-md sticky top-0 z-10 bg-white dark:bg-gray-900 dark:shadow-orange-500'>
        <div className='logo mx-5'>
            <Link href='/'><a><Image src='/N V Bookstore-1.png' alt='' height={45} width={200} /></a></Link>
        </div>
        <div className='nav'>
            <ul className='flex items-center space-x-4 font-bold md:text-base dark:text-orange-100'>
                <Link href='/books'><a><li>Books</li></a></Link>
                <Link href='/'><a><li>Menu2</li></a></Link>
                <Link href='/'><a><li>Menu3</li></a></Link>
                <Link href='/'><a><li>Menu4</li></a></Link>
            </ul>
        </div>
        
        <SideBar cart={cart} addToCart={addToCart}  removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
    </div>
  )
}

export default NavBar