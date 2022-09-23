// import React from 'react'
// import { useRouter } from "next/router";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Order from "./models/Order";
// import mongoose from "mongoose";
import { useRouter } from "next/router";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter;
  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await a.json();
      setOrders(res.myorderss);
      // console.log(res.myorderss);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, [router]);

  return (
    <div className="dark:bg-gray-900 min-h-[60vh]">
      <div className=" text-3xl text-center font-bold py-8 dark:text-orange-300 ">
        My Orders
      </div>

      <div className="relative">
        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className=""></th>
              <th scope="col" className="py-3 px-6">
                Order ID
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-orange-700 hover:bg-orange-100 dark:hover:bg-orange-700  cursor-pointer"
                >
                  <td className="py-3 px-6"></td>
                  <Link href={"/order?id=" + item._id}>
                    <th
                      scope="row"
                      className="py-3 px-6 font-medium whitespace-nowrap text-gray-900  dark:text-orange-50"
                    >
                      {item.orderID}
                    </th>
                  </Link>

                  <Link href={"/order?id=" + item._id}>
                    <td className="py-3 px-6">{item.createdAt.slice(0, 10)}</td>
                  </Link>

                  <Link href={"/order?id=" + item._id}>
                    <td className="py-3 px-6">₹ {item.amount}</td>
                  </Link>

                  <Link href={"/order?id=" + item._id}>
                    <td className="py-3 px-6">{item.status}</td>
                  </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
