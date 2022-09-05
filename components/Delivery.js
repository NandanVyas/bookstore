import React from "react";

const Delivery = () => {
  return (
    <>
      <div className="text-xl font-semibold my-4">1.Delivery Details</div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex-grow w-full">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="py-2 w-full">
        <div className="relative">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex-grow w-full">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pin Code
          </label>
          <input
            type="phone"
            id="pincode"
            name="pincode"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
          City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex-grow w-full">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
          State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </>
  );
};

export default Delivery;
