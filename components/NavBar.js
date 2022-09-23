import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import {AiOutlineShoppingCart} from 'react-icons/ai'
import SideBar from "./SideBar";

const NavBar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  //console.log(cart, addToCart,  removeFromCart, clearCart, subTotal)
  //Keys cannot be forwarded to the component as it is a special prop
  // console.log(key)
  return (
    <div className="flex justify-between flex-col items-center md:flex-row md:justify-start py-1 shadow-md sticky top-0 z-10 bg-white dark:bg-gray-900 dark:shadow-orange-500">
      <div className="logo mx-5">
        <Link href="/">
          <a>
            <Image src="/N V Bookstore-1.png" alt="" height={45} width={200} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-4 font-bold md:text-base dark:text-orange-100">
          <Link href="/cpp">
            <a>
              <li>C++</li>
            </a>
          </Link>
          <Link href="/java">
            <a>
              <li>Java</li>
            </a>
          </Link>
          <Link href="/python">
            <a>
              <li>Python</li>
            </a>
          </Link>
          <Link href="/others">
            <a>
              <li>Others</li>
            </a>
          </Link>
          <Link href="/all">
            <a>
              <li>All</li>
            </a>
          </Link>
        </ul>
      </div>
      {/* key={key} */}
      <SideBar
        logout={logout}
        user={user}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
    </div>
  );
};

export default NavBar;
