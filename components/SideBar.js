import React, { useRef } from "react";
import {AiOutlineCloseCircle,AiOutlineShoppingCart} from 'react-icons/Ai' 

const SideBar = () => {
    const toggleCart=()=>{
        if(ref.current.classList.contains('translate-x-full'))
        {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if(!ref.current.classList.contains('translate-x-full'))
        {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
            
        }
    }
    const ref=useRef()
  return (
    <div>
    <div onClick={toggleCart} className='cart absolute right-0 top-2 mx-4 cursor-pointer'>
            <AiOutlineShoppingCart className='text-xl md:text-2xl'/>
        </div>
    <div  ref={ref} className="sidebar absolute top-0 right-0 bg-orange-100 p-10 transform transition-transform translate-x-full">
      <h2 className="font-bold text-xl">SideBar</h2>
      <span>Java book</span>
      <span onClick={toggleCart} className="absolute top-2 right-2 cursor-pointer "><AiOutlineCloseCircle className="text-2xl text-orange-600"/></span>
    </div>
    </div>
  );
};

export default SideBar;
