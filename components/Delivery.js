import React from "react";
// import { useState } from "react";

const Delivery = ({
  setDisabled,
  name,
  setName,
  address,
  setAddress,
  phone,
  setPhone,
  pincode,
  setPincode,
  email,
  setEmail,
  state,
  setState,
  city,
  setCity,
}) => {
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [email, setEmail] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    }
    if (
      name.length >= 3 &&
      address.length >= 3 &&
      pincode.length >= 3 &&
      phone.length >= 3 &&
      email.length >= 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="text-xl font-semibold my-4">1.Delivery Details</div>
      <div className="flex py-2 w-full sm:flex-row flex-col mx-auto  sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="flex-grow w-full">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Full Name
          </label>
          <input
            value={name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-transparent focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex-grow w-full">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email <span className="text-xs italic">(Cannot be changed)</span>
          </label>
          <input
            value={email}
            onChange={handleChange}
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
            value={address}
            onChange={handleChange}
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
            value={phone}
            onChange={handleChange}
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
            value={pincode}
            onChange={handleChange}
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
            value={city}
            onChange={handleChange}
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
            value={state}
            onChange={handleChange}
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
