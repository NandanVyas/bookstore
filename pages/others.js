/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Book from "../models/Book";
import mongoose from "mongoose";

const Others = ({ books }) => {
  //console.log(books);
  return (
    <div>
      <section className="text-gray-600 body-font dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {books.map((item) => {
              return (
                <Link
                  passHref={true}
                  key={item._id}
                  href={`/product/${item.slug}`}
                >
                  <div className="lg:w-1/4 md:w-1/2 p-10 w-full cursor-pointer shadow-lg hover:scale-125 hover:bg-white dark:hover:bg-gray-700 dark:bg-gray-900 dark:shadow-orange-600 duration-500">
                    <a className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] md:h-[35vh] m-auto  block"
                        src={item.img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 dark:text-white text-xs tracking-widest title-font mb-1">
                        {item.year}
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
  let books = await Book.find({ category: "others" });
  return {
    props: { books: JSON.parse(JSON.stringify(books)) }, // will be passed to the page component as props
  };
}

export default Others;
