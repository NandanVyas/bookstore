import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Order from "./models/Order";
import mongoose from "mongoose";
const MyOrder = ({ myorder }) => {
  // console.log(myorder);
  const products = myorder.products;
  const pyinfo = JSON.parse(myorder.paymentInfo);
  // console.log(pyinfo);
  // console.log(products);
  // const router=useRouter()
  // const {id}=router.query
  // console.log("my id=")
  // console.log(id)
  // console.log("haha")

  const [pmode, setPmode] = useState("Original");
  //PAYMENT TYPE VALUES :  PPI , UPI , CC , DC , NB
  
  useEffect(() => {
    if (pyinfo.PAYMENTMODE == "PPI") {
      setPmode("Paytm Wallet");
    } else if (pyinfo.PAYMENTMODE == "UPI") {
      setPmode("Bhim UPI");
    } else if (pyinfo.PAYMENTMODE == "CC") {
      setPmode("Credit Card");
    } else if (pyinfo.PAYMENTMODE == "DC") {
      setPmode("Debit Card");
    } else if (pyinfo.PAYMENTMODE == "NB") {
      setPmode("Net Banking");
    }

}, [])


  //console.log(pyinfo.PAYMENTMODE, pmode);

  //CHANGE THE BELOW FXN TO WITHOUT useState
  const [statusColor, setStatusColor] = useState("text-yellow-600");
  if (statusColor != "text-green-600" && myorder.status == "Success") {
    setStatusColor("text-green-600");
  } else if (
    statusColor != "text-red-600" &&
    (myorder.status == "Error" || myorder.status == "Cancelled")
  ) {
    setStatusColor("text-red-600");
  }
  //console.log(statusColor)

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {myorder.createdAt.slice(0, 10)}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium ">
                Order ID: #{myorder.orderID}
              </h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Transaction ID:{pyinfo.BANKTXNID}
              </h2>
              <div className="text-base  text-gray-500 mb-4">
                Payment Status :{" "}
                <span className={`text-xl font-semibold ${statusColor}`}>
                  {myorder.status}
                </span>
              </div>
              <div className="flex mb-2 ">
                {/* border-b-2 border-orange-500 */}
                <a className="flex-grow w-1/2 text-black font-semibold  text-lg px-1">
                  Description
                </a>
                <a className="flex-grow w-1/4 text-black font-semibold  text-lg px-1">
                  Qty
                </a>
                <a className="flex-grow w-1/4 text-right text-black font-semibold  text-lg px-1">
                  Price
                </a>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div
                    key={key}
                    className="flex border-t border-orange-200 py-2"
                  >
                    <span className=" w-1/2  text-gray-500">
                      {products[key].name}
                    </span>
                    <span className="w-1/4  text-gray-500">
                      {products[key].qty}
                    </span>
                    <span className="w-1/4 text-right  text-gray-900">
                      ₹ {products[key].price}
                    </span>
                  </div>
                );
              })}
              <div className="flex ">
                <a className="flex-grow w-2/3 text-black font-semibold  text-lg px-1 mb-1 mt-4">
                  Shipping Address
                  <div className=" text-sm font-normal   ml-1  text-gray-500">
                    <div>{myorder.name}</div>
                    <div>{myorder.phone}</div>
                    <div>{myorder.address}</div>
                    <div>Pin:{myorder.pincode}</div>
                  </div>
                </a>
                <a className="flex-grow w-1/2 text-black font-semibold  text-lg px-1 mb-1 mt-4">
                  Payment Method
                  <div className="w-1/2 text-sm font-normal  ml-1 text-gray-500">
                    {pyinfo.BANKNAME} 
                    {/* {pyinfo.GATEWAYNAME} */}
                    <div>{pmode}</div>
                  </div>
                  
                </a>
                
              </div>
              <div className="flex-grow w-1/2 text-black font-semibold  text-lg px-1  mt-4">
                  Order Summary
                  <div className="flex ">
                <span className="font-medium ml-1  text-gray-500">
                  SubTotal: ₹ {myorder.amount}
                </span>
              </div>
                </div>
              
              <div className="my-6">
                <Link href={"/"}>
                  <a>
                    <button className="flex  text-white bg-orange-500 items-center py-2 px-4 focus:outline-none hover:bg-orange-600 rounded">
                      Continue Shopping
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let myorder = await Order.findById(context.query.id);
  // console.log(myorder)
  //let similar = await Book.find({title: books.title});
  return {
    props: { myorder: JSON.parse(JSON.stringify(myorder)) }, // will be passed to the page component as props
  };
}

export default MyOrder;