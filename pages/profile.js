import React from "react";
import Delivery2 from "../components/Delivery2";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const jwt = require("jsonwebtoken");
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
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
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmnewpassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "newpassword") {
      setNewpassword(e.target.value);
    } else if (e.target.name == "confirmnewpassword") {
      setConfirmnewpassword(e.target.value);
    }
  };

  useEffect(() => {
    const mytoken = localStorage.getItem("token");
    if (!mytoken) {
      router.push("/");
    } else {
      // console.log(mytoken);
      setToken(mytoken);
      fetchData(mytoken);
    }
  }, [router]);

  const fetchData = async (mytoken) => {
    // const token = localStorage.getItem("token");
    let data = { token: mytoken };
    // console.log(data);
    let a = await fetch(`api/getUserDetails`, {
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
    setEmail(res.user.email);
    setName(res.user.name);
    setAddress(res.user.address);
    setCity(res.user.city);
    setPhone(res.user.phone);
    setPincode(res.user.pincode);
    setState(res.user.state);
  };

  const handleUpdateDetails = async () => {
    // const token = localStorage.getItem("token");
    let data = {
      token: token,
      address: address,
      name: name,
      pincode: pincode,
      state: state,
      city: city,
      phone: phone,
    };
    let a = await fetch(
      `api/updateUserDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await a.json();
    toast.success("Profile Updated !!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // console.log(res);
  };

  const handleUpdatePassword = async () => {
    // const token = localStorage.getItem("token");
    let data = {
      token: token,
      password: password,
      newpassword: newpassword,
      confirmnewpassword: confirmnewpassword,
    };
    let a = await fetch(`api/updatePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      setPassword("");
      setNewpassword("");
      setConfirmnewpassword("");
      toast.success("Password Updated !!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // console.log(res);
  };

  return (
    <div className="dark:bg-gray-900 min-h-[60vh] px-20">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className=" text-3xl text-center font-bold py-8 dark:text-orange-300 ">
        Profile{" "}
      </div>
      <Delivery2
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

      <div className="text-xl font-semibold my-6 dark:text-orange-300">
        2. Change Password
      </div>
      <div className="w-1/2 mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-50"
        >
          Password
        </label>
        <input
          value={password}
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-orange-200 dark:focus:ring-orange-500 dark:focus:border-orange-500"
          required=""
        />
      </div>
      <div className="w-1/2 mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-50"
        >
          New Password
        </label>
        <input
          value={newpassword}
          onChange={handleChange}
          type="password"
          name="newpassword"
          id="newpassword"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-orange-200 dark:focus:ring-orange-500 dark:focus:border-orange-500"
          required=""
        />
      </div>
      <div className="w-1/2 mb-6">
        <label
          htmlFor="confirmpassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-50"
        >
          Confirm New password
        </label>
        <input
          value={confirmnewpassword}
          onChange={handleChange}
          type="password"
          name="confirmnewpassword"
          id="confirmnewpassword"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-orange-200 dark:focus:ring-orange-500 dark:focus:border-orange-500"
          required=""
        />
      </div>
      <button
        onClick={handleUpdatePassword}
        className="disabled:bg-orange-200 flex mr-4 mt-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"
      >
        Update Password
      </button>
    </div>
  );
};

export default Profile;
