import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.remove("hidden");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full","hidden");
    }
  };
  const ref = useRef();
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="cart flex absolute right-0 top-4 mx-4 cursor-pointer items-center">
        {user.value && (
          <Link href={"/profile"} className="items-center">
            <a
              className="mx-2 pt-2"
              onMouseEnter={() => setProfileDropdown(true)}
              onMouseLeave={() => setProfileDropdown(false)}
              onTouchStart={() => setProfileDropdown(true)}
            >
              <Image
                height={20}
                width={20}
                src="/logged-in.jpg"
                alt="User Logged In"
              />
            </a>
          </Link>
        )}
        {profileDropdown && (
          <div
            onMouseEnter={() => setProfileDropdown(true)}
            onMouseLeave={() => setProfileDropdown(false)}
            className="bg-orange-50 rounded-md w-20 h-24 text-sm p-2 dark:text-orange-600 dark:bg-gray-700 absolute top-6 right-8"
          >
            <ul className="">
              <li className="pb-1 hover:text-gray-500 dark:hover:text-orange-200 font-bold">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="pb-1 hover:text-gray-500 dark:hover:text-orange-200 font-bold">
                <Link href="/orders">Orders</Link>
              </li>
              <li className=" hover:text-gray-500 dark:hover:text-orange-200 font-bold">
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
        {!user.value && (
          <Link href={"/login"}>
            <a>
              <MdAccountCircle className="text-xl mx-2 md:text-2xl dark:text-orange-300" />
            </a>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl dark:text-orange-300 "
        />
      </div>
      <div
        ref={ref}
        className={`sidebar w-72 h-[100vh]  absolute top-0 right-0 bg-orange-100 dark:bg-orange-600  px-6 py-10 transform transition-transform ${
          Object.keys(cart).length === 0 ? "translate-x-full hidden" : "translate-x-0"
        }`}
        // overflow-y-scroll
      >
        <h2 className="text-center font-bold text-xl">SideBar</h2>

        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer "
        >
          <AiOutlineCloseCircle className="text-2xl text-orange-600 dark:text-black" />
        </span>
        <ol className="list-decimal font-bold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-base font-bold">
              No Items present in the cart
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-bold">{cart[k].name}</div>
                  <div className="w-1/3 font-semibold flex items-center justify-center text-xl ">
                    <AiOutlineMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].author
                        );
                      }}
                      className="mx-2 text-xl text-orange-600 cursor-pointer dark:text-black "
                    />
                    {cart[k].qty}
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].author
                        );
                      }}
                      className="mx-2 text-xl cursor-pointer text-orange-600 dark:text-black"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="my-2 font-bold">SubTotal : ₹ {subTotal} </div>
        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-4 text-white dark:font-semibold dark:text-orange-500 bg-orange-500 dark:bg-gray-800 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 dark:hover:bg-gray-600 rounded text-lg">
              {" "}
              <BsFillCartCheckFill className="m-1" /> Checkout{" "}
            </button>
          </Link>
          <button
            className="flex text-white dark:font-semibold dark:text-orange-500 bg-orange-500 dark:bg-gray-800 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 dark:hover:bg-gray-600 rounded text-lg"
            onClick={clearCart}
          >
            {" "}
            Clear Cart{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
