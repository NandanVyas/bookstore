/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Book from "../models/Book";
import mongoose from "mongoose";
import { capitalize } from "@mui/material";

const Python = ({ books }) => {
  //console.log(books);
  return (
    <div>
      <section className="text-gray-600 body-font dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {books.map((item) => {
              return (
                <Link passHref={true} key={item._id} href={`/product/${item.slug}`}>
                  <div className="cursor-pointer 
                 shadow-lg
                 hover:scale-125 hover:bg-white dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-600 duration-500 rounded-lg p-4">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] md:h-[35vh] m-auto  block"
                        src={item.img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 dark:text-gray-200 text-xs tracking-widest title-font mb-1">
                        {capitalize(item.category) }
                      </h3>
                      <h2 className="text-gray-900 dark:text-white title-font text-lg font-medium">
                        {item.title}
                      </h2>
                      <h2 className="text-gray-700 dark:text-white title-font text-base font-medium">
                        {item.author}
                      </h2>
                      <p className="mt-1 dark:text-white">₹{item.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let books = await Book.find({category:"python"});
  return {
    props: { books: JSON.parse(JSON.stringify(books)) }, // will be passed to the page component as props
  };
}

export default Python;
