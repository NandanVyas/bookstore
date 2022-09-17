import React from "react";
import Delivery from "../components/Delivery";
import Review from "../components/Review";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { BsFillCartCheckFill } from "react-icons/Bs";
import { useState, useEffect } from "react";
import { Router } from "next/router";
const jwt = require("jsonwebtoken");

const Profile = () => {
  // const jwt=require("jsonwebtoken");
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const mytoken = localStorage.getItem("token");
    if (!mytoken) {
      router.push("/");
    } else {
      // console.log(mytoken);
      setToken(mytoken);

      const data = jwt.verify(mytoken, "secretjwt");
      // console.log(data);

      setEmail(data.email);
      setName(data.name);
      fetchData(mytoken);
    }
  }, []);
  
  const fetchData = async (mytoken) => {
    // const token = localStorage.getItem("token");
    let data = { token: mytoken };
    // console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUserDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    // console.log("yay")
    // console.log("Address is ",res.address)
    setAddress(res.user.address);
    setCity(res.user.city);
    setPhone(res.user.phone);
    setPincode(res.user.pincode)
    setState(res.user.state)
    

  };

  const handleUpdateDetails = async () => {
    // const token = localStorage.getItem("token");
    let data = { token:token,address:address,name:name ,pincode:pincode,state:state,city:city,phone:phone};
    let a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updateUserDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await a.json();
    // console.log(res);
  };

  return (
    <div className="dark:bg-gray-900 min-h-[60vh] px-20">
      <div className=" text-3xl text-center font-bold py-8 dark:text-orange-300 ">
        Profile{" "}
      </div>
      <Delivery
        setDisabled={setDisabled}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        pincode={pincode}
        setPincode={setPincode}
        address={address}
        setAddress={setAddress}
        email={email}
        setEmail={setEmail}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
      />
      
      <button
        onClick={handleUpdateDetails}
        className="disabled:bg-orange-200 flex mr-4 mt-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"
      >
        Update Details
      </button>

      <div className="text-xl font-semibold my-4">
        2. Change Password
      </div>


    </div>
  );
};

export default Profile;
