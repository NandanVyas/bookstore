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
  const [search, setSearch] = useState("")
  // console.log(search)
  //console.log(cart, addToCart,  removeFromCart, clearCart, subTotal)
  //Keys cannot be forwarded to the component as it is a special prop
  // console.log(key)
  return (
    <div className="flex justify-between flex-col items-center md:flex-row md:justify-start py-1 shadow-md sticky top-0 z-10 bg-white dark:bg-gray-900 dark:shadow-orange-500">
      <div className="mx-5">
        <Link href={"/"}>
          <a>
            <Image src="/N V BookStore-1.png" alt="" width={200} height={40} />
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
      <div className="md:ml-6 lg:ml-14 flex lg:w-[40%]">
        <form className="flex items-center w-full">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Search"
            />
          </div>
          <Link href={`/search?title=${search}`}><button
            type="submit"
            className="p-2.5 ml-1 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
          >
            <svg
              className="w-5 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          </Link>
        </form>
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
