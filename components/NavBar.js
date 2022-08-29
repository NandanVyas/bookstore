import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/Ai'

const NavBar = () => {
  return (
    <div className='flex justify-between flex-col items-center md:flex-row md:justify-start py-2'>
        <div className='logo mx-5'>
            <Image src='/N V Bookstore-1.png' alt='' height={45} width={200} />
        </div>
        <div className='nav'>
            <ul className='flex items-center space-x-2 font-bold md:text-xl'>
                <Link href='/'><a><li>Books</li></a></Link>
                <Link href='/'><a><li>Menu2</li></a></Link>
                <Link href='/'><a><li>Menu3</li></a></Link>
                <Link href='/'><a><li>Menu4</li></a></Link>
            </ul>
        </div>
        <div className='cart absolute right-0 top-2 mx-4'>
            <AiOutlineShoppingCart className='text-xl md:text-3xl'/>
        </div>
    </div>
  )
}

export default NavBar