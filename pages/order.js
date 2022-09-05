import React from 'react'

const order = ({cart}) => {
  return (
    <><section className="text-gray-600 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">NV BookStore</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order ID: #22302</h1>
          <div className="flex mb-2 ">
          {/* border-b-2 border-orange-500 */}
            <a className="flex-grow w-1/2 text-orange-600  text-lg px-1">Description</a>
            <a className="flex-grow w-1/4 text-orange-600  text-lg px-1">Qty</a>
            <a className="flex-grow w-1/4 text-right text-orange-600  text-lg px-1">Price</a>
          </div>
          
          <div className="flex border-t border-orange-200 py-2">
            <span className=" w-1/2  text-gray-500">Author</span>
            <span className="w-1/4  text-gray-500">10</span>
            <span className="w-1/4 text-right  text-gray-900">₹58.00</span>
          </div>
          
          
          
          <div className="flex mt-4">
            <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹58.00</span>
            
            
          </div>
          <div className='my-6'><button className="flex  text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Track Order</button></div>
        </div>
        <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
      </div>
    </div>
  </section></>
  )
}

export default order