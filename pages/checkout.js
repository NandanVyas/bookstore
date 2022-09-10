import React from "react";
import Delivery from "../components/Delivery";
import Review from "../components/Review";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import { BsFillCartCheckFill } from "react-icons/Bs";
import { useState } from "react";

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {

const [disabled, setDisabled] = useState(true)

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() + Date.now());

    //fetch a transaction token
    const data = { cart, subTotal, oid, email: "email" };
    //console.log(data) working

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
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
    <div className="container px-2 sm:m-auto">
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

      <div className=" text-3xl text-center font-bold my-8 ">Checkout</div>
      <Delivery setDisabled={setDisabled}/>
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
          className="disabled:bg-orange-200 flex mr-4  text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-lg"
        >
          {" "}
          <BsFillCartCheckFill className="m-1" /> Pay ₹{subTotal}
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
