/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Books = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link href={'/product/learn-java'}><div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg ">
              <a className="block relative rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="h-[30vh] md:h-[35vh] m-auto md:mx-0 block"
                  src="https://m.media-amazon.com/images/I/41fYBlpG-bL.jpg"
                />
              </a>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Books
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Learn Java
                </h2>
                <h2 className="text-gray-700 title-font text-base font-medium">
                  Author
                </h2>
                <p className="mt-1">₹299</p>
              </div>
            </div>
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
