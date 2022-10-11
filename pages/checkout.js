import React from "react";
import Delivery from "../components/Delivery";
import Review from "../components/Review";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const mytoken = localStorage.getItem("token");
    if (!mytoken) {
      router.push("/");
    } else {
      // console.log(mytoken);
      setToken(mytoken);
      const jwt = require("jsonwebtoken");
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
    setAddress(res.user.address);
    setCity(res.user.city);
    setPhone(res.user.phone);
    setPincode(res.user.pincode);
    setState(res.user.state);
  };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() + Date.now());

    //fetch a transaction token
    const data = { cart, subTotal, oid, email, address, name };
    //console.log(data) working

    let a = await fetch(`api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.txnToken;
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: subTotal,
      },
      merchant: {
        redirect: true,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        console.log("This is window success");
        // after successfully updating configuration, invoke checkoutjs
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="dark:bg-gray-900 min-h-[60vh] px-20">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <div className=" text-3xl text-center font-bold py-8 dark:text-orange-300">
        Checkout
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
      <Review
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
      />

      <Link href={"/checkout"}>
        <button
          onClick={initiatePayment}
          disabled={disabled}
          className="disabled:bg-orange-200 flex mr-4 mt-5 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg"
        >
          {" "}
          <BsFillCartCheckFill className="m-1" /> Pay ₹{subTotal}
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
