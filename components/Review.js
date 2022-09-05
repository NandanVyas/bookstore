import React from "react";
import Link from "next/link";

import {
  AiOutlineCloseCircle,
  AiOutlineShoppingCart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/Ai";
import { BsFillCartCheckFill } from "react-icons/Bs";
const Review = ({cart, addToCart, removeFromCart,  subTotal}) => {
    
  return (
    <>
      <div className="text-xl font-semibold mt-11 my-2">2.Review Cart Items</div>
      <div>
        
        <div className="sidebar   px-2 py-2 m-2 ">
          
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold">
                No Items present in the cart
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="font-semibold">{cart[k].name}</div>
                    <div className="font-semibold flex items-center justify-center w-1/3 text-lg">
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
                        className="mx-2 text-xl text-orange-600 cursor-pointer"
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
                        className="mx-2 text-xl cursor-pointer text-orange-600"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        
          <div className="font-bold" >SubTotal: ₹{subTotal}</div>
          </div>
        </div>
      
    </>
  );
};

export default Review;
