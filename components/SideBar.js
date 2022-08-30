import React, { useRef } from "react";
import { AiOutlineCloseCircle, AiOutlineShoppingCart, AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/Ai";

const SideBar = () => {
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
    <div>
      <div
        onClick={toggleCart}
        className="cart absolute right-0 top-2 mx-4 cursor-pointer"
      >
        <AiOutlineShoppingCart className="text-xl md:text-2xl" />
      </div>
      <div
        ref={ref}
        className="sidebar w-72 absolute top-0 right-0 bg-orange-100 px-6 py-10 transform transition-transform translate-x-full"
      >
        <h2 className="text-center font-bold text-xl">SideBar</h2>

        <span
          onClick={toggleCart}
          className="absolute top-2 right-2 cursor-pointer "
        >
          <AiOutlineCloseCircle className="text-2xl text-orange-600" />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">Hi i am nandan</div>
              <div className="w-1/3 font-semibold flex items-center justify-center text-xl"><AiOutlineMinusCircle className="mx-2 text-xl text-orange-500"/>1<AiOutlinePlusCircle className="mx-2 text-xl"/></div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SideBar;
