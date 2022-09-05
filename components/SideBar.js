import React, { useRef } from "react";
import Link from "next/link";

import {
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/Ai";
import { BsFillCartCheckFill } from "react-icons/Bs";

const SideBar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <>
      <div
        onClick={toggleCart}
        className="cart absolute right-0 top-2 mx-4 cursor-pointer"
      >
        <AiOutlineShoppingCart className="text-xl md:text-2xl" />
      </div>
      <div
        ref={ref}
      className={`sidebar w-72 h-[100vh] absolute top-0 right-0 bg-orange-100 px-6 py-10 transform transition-transform ${Object.keys(cart).length===0 ? 'translate-x-full' :'translate-x-0'}`}
      >
        <h2 className="text-center font-bold text-xl">SideBar</h2>

        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer "
        >
          <AiOutlineCloseCircle className="text-2xl text-orange-600" />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length ==0 && <div className="my-4 text-base font-semibold">No Items present in the cart</div>}
          {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">{cart[k].name}</div>
              <div className="w-1/3 font-semibold flex items-center justify-center text-xl">
                <AiOutlineMinusCircle onClick={()=>{removeFromCart(k,1,cart[k].price,cart[k].name,cart[k].author)}} className="mx-2 text-xl text-orange-600 cursor-pointer" />
                {cart[k].qty}
                <AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].name,cart[k].author)}} className="mx-2 text-xl cursor-pointer text-orange-600" />
              </div>
            </div>
          </li>})}
        </ol>
        <div className="my-2">SubTotal: ₹{subTotal} </div>
        <div className="flex">
          <Link href={'/checkout'}><button className="flex mr-4  text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg">
            {" "}
            <BsFillCartCheckFill className="m-1" /> Checkout{" "}
          </button></Link>
          <button
            className="flex   text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg"
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
